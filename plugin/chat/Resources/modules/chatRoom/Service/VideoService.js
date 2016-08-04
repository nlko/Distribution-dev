/*
 * This file is part of the Claroline Connect package.
 *
 * (c) Claroline Consortium <consortium@claroline.net>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/* eslint no-unused-vars: ["error", { "vars": "local" }] */
/* global $msg */
/* global hark */
/* global setupRTC */
/* global RTC */
/* global RTCPeerconnection */
/* global getUserMediaWithConstraints */
/* global Strophe */

import angular from 'angular/index'

export default class VideoService {
  constructor ($http, $sce, $log, ChatRoomService, UserService) {
    this.$http = $http
    this.$sce = $sce
    this.$log = $log
    this.ChatRoomService = ChatRoomService
    this.UserService = UserService
    this.chatRoomConfig = this.ChatRoomService.getConfig()
    this.xmppConfig = this.ChatRoomService.getXmppConfig()
    this.videoConfig = {
      ice_config: {
        iceServers: this.chatRoomConfig.iceServers
      },
      AUTOACCEPT: true,
      PRANSWER: false, // use either pranswer or autoaccept
      // connection: null,
      roomjid: null,
      myUsername: null,
      users: this.UserService.getUsers(),
      sids: {},
      sourceStreams: {},
      usersMicroStatus: {},
      lastSpeakingUser: null,
      localStream: null,
      myAudioTracks: [],
      myVideoTracks: [],
      myAudioEnabled: true,
      myVideoEnabled: true,
      mySourceStream: null,
      mainStreamUsername: null,
      selectedUser: null,
      speakingUser: null
    }

    this.RTC = null
    this.$log.log(this.videoConfig.ice_config)
    this._startMedias = this._startMedias.bind(this)
    this._stopUserStream = this._stopUserStream.bind(this)
    this._manageManagementMessage = this._manageManagementMessage.bind(this)
    this._updateMainStream = this._updateMainStream.bind(this)
    this._onMediaReady = this._onMediaReady.bind(this)
    this._onMediaFailure = this._onMediaFailure.bind(this)
    this._onCallIncoming = this._onCallIncoming.bind(this)
    this._onCallTerminated = this._onCallTerminated.bind(this)
    this._onRemoteStreamAdded = this._onRemoteStreamAdded.bind(this)
    this._onRemoteStreamRemoved = this._onRemoteStreamRemoved.bind(this)
    this._onIceConnectionStateChanged = this._onIceConnectionStateChanged.bind(this)
    this._noStunCandidates = this._noStunCandidates.bind(this)
    this._waitForRemoteVideo = this._waitForRemoteVideo.bind(this)
    this.ChatRoomService.setConnectedCallback(this._startMedias)
    this.ChatRoomService.setUserDisconnectedCallback(this._stopUserStream)
    this.ChatRoomService.setManagementCallback(this._manageManagementMessage)
    setInterval(this._updateMainStream, 1000)
  }

  getVideoConfig () {
    return this.videoConfig
  }

  switchVideo () {
    if (this.videoConfig['myVideoEnabled']) {
      this.videoConfig['myVideoTracks'].forEach(t => {
        t.enabled = false
      })
      this.videoConfig['myVideoEnabled'] = false
    } else {
      this.videoConfig['myVideoTracks'].forEach(t => {
        t.enabled = true
      })
      this.videoConfig['myVideoEnabled'] = true
    }
    const streamURL = window.URL.createObjectURL(this.videoConfig['localStream'])
    const trustedStreamURL = this.$sce.trustAsResourceUrl(streamURL)
    this.videoConfig['mySourceStream'] = trustedStreamURL
    this.videoConfig['sourceStreams'][this.chatRoomConfig['myUsername']] = trustedStreamURL
  }

  switchAudio () {
    if (this.videoConfig['myAudioEnabled']) {
      this.videoConfig['myAudioTracks'].forEach(t => {
        t.enabled = false
      })
      this.videoConfig['myAudioEnabled'] = false
    } else {
      this.videoConfig['myAudioTracks'].forEach(t => {
        t.enabled = true
      })
      this.videoConfig['myAudioEnabled'] = true
    }

    const streamURL = window.URL.createObjectURL(this.videoConfig['localStream'])
    const trustedStreamURL = this.$sce.trustAsResourceUrl(streamURL)
    this.videoConfig['mySourceStream'] = trustedStreamURL
    this.videoConfig['sourceStreams'][this.chatRoomConfig['myUsername']] = trustedStreamURL

    this.sendMicroStatus()
  }

  switchUserAudio (username = null) {
    if (username === null) {
      this.switchAudio()
    } else {
      this.requestUserMicroSwitch(username)
    }
  }

  requestUserMicroSwitch (username) {
    this.xmppConfig['connection'].send(
      $msg({
        to: this.chatRoomConfig['room'],
        type: 'groupchat'
      }).c('body').t('')
        .up()
        .c('datas', {status: 'management', username: username, type: 'video-micro-switch'})
    )
  }

  requestUserMicroStatus (username) {
    this.xmppConfig['connection'].send(
      $msg({
        to: this.chatRoomConfig['room'],
        type: 'groupchat'
      }).c('body').t('')
        .up()
        .c('datas', {status: 'management', username: username, type: 'video-micro-status-request'})
    )
  }

  sendMicroStatus () {
    this.xmppConfig['connection'].send(
      $msg({
        to: this.chatRoomConfig['room'],
        type: 'groupchat'
      }).c('body').t('')
        .up()
        .c('datas', {
          status: 'management',
          username: this.chatRoomConfig['myUsername'],
          type: 'video-micro-status',
          value: this.videoConfig['myAudioEnabled']
        })
    )
  }

  sendSpeakingNotification () {
    this.xmppConfig['connection'].send(
      $msg({
        to: this.chatRoomConfig['room'],
        type: 'groupchat'
      }).c('body').t('')
        .up()
        .c(
          'datas', {
            status: 'management',
            username: this.chatRoomConfig['myUsername'],
            type: 'speaking',
            value: 1
          })
    )
  }

  stopMedia () {
    this.videoConfig['myAudioTracks'].forEach(t => {
      t.stop()
    })
    this.videoConfig['myVideoTracks'].forEach(t => {
      t.stop()
    })
  }

  selectSourceStream (username) {
    this.$log.log(username)
    if (this.videoConfig['selectedUser'] === username) {
      this.videoConfig['selectedUser'] = null
    } else {
      this.videoConfig['selectedUser'] = username
    }
    this.$log.log(`Selected user: ${this.videoConfig['selectedUser']}`)
    this.videoConfig['mainStreamUsername'] = username
  }

  initiateCalls () {
    this.$log.log('Initiating calls...')
    this.videoConfig['users'].forEach(u => {
      if (u['username'] !== this.chatRoomConfig['myUsername']) {
        this.$log.log(`${this.chatRoomConfig['room']}/${u['username']}`)
        this.$log.log(`${this.chatRoomConfig['room']}/${this.chatRoomConfig['myUsername']}`)
        const session = this.xmppConfig['connection'].jingle.initiate(
          `${this.chatRoomConfig['room']}/${u['username']}`,
          `${this.chatRoomConfig['room']}/${this.chatRoomConfig['myUsername']}`
        )

        // as long a we don't have a better fix...
        if (this.RTC.browser === 'firefox') session.usetrickle = false

        if (session['sid']) {
          this.addSid(session['sid'], u['username'])
        }
        this.requestUserMicroStatus(u['username'])
      }
    })
  }

  initiateHark () {
    if (typeof hark === 'function') {
      const options = { interval: 400 }
      const speechEvents = hark(this.videoConfig['localStream'], options)

      speechEvents.on('speaking', () => {
        if (this.videoConfig['myAudioEnabled']) {
          this.sendSpeakingNotification()
        }
      })
      speechEvents.on('stopped_speaking', () => {
        if (this.videoConfig['myAudioEnabled']) {
          this.$log.log('Stopped speaking.')
        }
      })
      speechEvents.on('volume_change', (volume) => {
        if (this.videoConfig['myAudioEnabled'] && this.videoConfig['speakingUser'] !== this.chatRoomConfig['myUsername'] && volume > -50) {
          this.sendSpeakingNotification()
        }
      })
    }
  }

  addSid (sid, username) {
    this.videoConfig['sids'][sid] = username
  }

  closeAllConnections () {
    for (let sid in this.videoConfig['sids']) {
      this.$log.log('Try to close ' + sid)
      this.$log.log(this.xmppConfig['connection'].jingle.sessions[sid])
      if (this.xmppConfig['connection'].jingle.sessions[sid].state === 'active') {
        this.xmppConfig['connection'].jingle.sessions[sid].terminate('Closing all connections...')
        this.$log.log(`${sid} : closed`)
      }
    }
  }

  _updateMainStream () {
    this.$log.log('_updateMainStream')
    if (this.videoConfig['selectedUser'] !== null) {
      if (this.videoConfig['mainStreamUsername'] !== this.videoConfig['selectedUser']) {
        this.videoConfig['mainStreamUsername'] = this.videoConfig['selectedUser']
        this.ChatRoomService.refreshScope()
        this.$log.log(`Selected user : ${this.videoConfig['mainStreamUsername']}`)
      }
    } else if (this.videoConfig['speakingUser'] !== null) {
      if (this.videoConfig['mainStreamUsername'] !== this.videoConfig['speakingUser']) {
        this.videoConfig['mainStreamUsername'] = this.videoConfig['speakingUser']
        this.ChatRoomService.refreshScope()
        this.$log.log(`Speaking user : ${this.videoConfig['mainStreamUsername']}`)
      }
    }
  }

  _startMedias () {
    // for getUserMediaWithConstraints()
    RTC = this.RTC = setupRTC()
    getUserMediaWithConstraints(['audio', 'video'])
    this.xmppConfig['connection'].jingle.ice_config = this.videoConfig['ice_config']
    angular.element(document).bind('mediaready.jingle', this._onMediaReady)
    angular.element(document).bind('mediafailure.jingle', this._onMediaFailure)
    angular.element(document).bind('callincoming.jingle', this._onCallIncoming)
    // angular.element(document).bind('callactive.jingle', this._onCallActive)
    angular.element(document).bind('callterminated.jingle', this._onCallTerminated)
    angular.element(document).bind('remotestreamadded.jingle', this._onRemoteStreamAdded)
    angular.element(document).bind('remotestreamremoved.jingle', this._onRemoteStreamRemoved)
    angular.element(document).bind('iceconnectionstatechange.jingle', this._onIceConnectionStateChanged)
    angular.element(document).bind('nostuncandidates.jingle', this._noStunCandidates)
    angular.element(document).bind('ack.jingle', function (event, sid, ack) {
      this.$log.log('got stanza ack for ' + sid, ack)
    })
    angular.element(document).bind('error.jingle', function (event, sid, err) {
      if (sid) {
        this.$log.error('got stanza error for ' + sid, err)
      } else {
        this.$log.error('no sid defined for', err)
      }
    })
    angular.element(document).bind('packetloss.jingle', function (event, sid, loss) {
      this.$log.warn('packetloss', sid, loss)
    })

    if (this.RTC) {
      RTCPeerconnection = this.RTC.peerconnection
      this.xmppConfig['connection'].jingle.pc_constraints = this.RTC.pc_constraints

      if (this.RTC.browser === 'firefox') {
        this.xmppConfig['connection'].jingle.media_constraints.mandatory.mozDontOfferDataChannel = true
        this.xmppConfig['connection'].jingle.media_constraints.offerToReceiveAudio = true
        this.xmppConfig['connection'].jingle.media_constraints.offerToReceiveVideo = true
      }
    } else {
      this.$log.log('webrtc capable browser required')
    }
  }

  _stopUserStream (username) {
    this.$log.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')
    for (let sid in this.videoConfig['sids']) {
      if (this.videoConfig['sids'][sid] === username) {
        this.xmppConfig['connection'].jingle.sessions[sid].terminate('disconnected user')
        delete this.xmppConfig['connection'].jingle.sessions[sid]
        delete this.videoConfig['sids'][sid]
      }
    }
    this.$log.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')
  }

  _manageManagementMessage (type, username, name, value) {
    if (type === 'video-micro-status') {
      if (username !== this.chatRoomConfig['myUsername']) {
        this.videoConfig['usersMicroStatus'][username] = (value == 'true')
        this.ChatRoomService.refreshScope()
      }
    } else if (type === 'video-micro-status-request') {
      if (username === this.chatRoomConfig['myUsername']) {
        this.$log.log('resend micro status request')
        this.sendMicroStatus()
      }
    } else if (type === 'video-micro-switch') {
      if (username === this.chatRoomConfig['myUsername']) {
        this.switchAudio()
        this.ChatRoomService.refreshScope()
      }
    } else if (type === 'speaking') {
      this.$log.log(`${username} is speaking...`)
      this.videoConfig['speakingUser'] = username
      this.ChatRoomService.refreshScope()
    }
  }

  _onMediaReady (event, stream) {
    this.$log.log('Media ready')
    this.videoConfig['localStream'] = stream
    this.xmppConfig['connection'].jingle.localStream = stream
    this.videoConfig['localStream'].getAudioTracks().forEach(t => this.videoConfig['myAudioTracks'].push(t))
    this.videoConfig['localStream'].getVideoTracks().forEach(t => this.videoConfig['myVideoTracks'].push(t))

    // Mute sound in my video & main video to avoid echo
    angular.element(document).find('#my-video')[0].muted = true
    angular.element(document).find('#my-video')[0].volume = true
    angular.element(document).find('#main-video')[0].muted = true
    angular.element(document).find('#main-video')[0].volume = true

    const streamURL = window.URL.createObjectURL(this.videoConfig['localStream'])
    const trustedStreamURL = this.$sce.trustAsResourceUrl(streamURL)
    this.videoConfig['mySourceStream'] = trustedStreamURL
    this.videoConfig['sourceStreams'][this.chatRoomConfig['myUsername']] = trustedStreamURL
    this.videoConfig['mainStreamUsername'] = this.chatRoomConfig['myUsername']
    this.initiateCalls()
    this.sendMicroStatus()
    this.initiateHark()
    this.ChatRoomService.refreshScope()
  }

  _onMediaFailure () {
    this.$log.log('Media failure')
  }

  _onCallIncoming (event, sid) {
    this.$log.log(`Incoming call : ${sid}`)
    const sess = this.xmppConfig['connection'].jingle.sessions[sid]
    const initiator = Strophe.getResourceFromJid(sess['initiator'])
    this.addSid(sid, initiator)
    sess.sendAnswer()
    sess.accept()
  }

  _onCallTerminated () {
    this.$log.log('Call terminated')
  }

  _onRemoteStreamAdded (event, data, sid) {
    this.$log.log(`Remote stream for session ${sid} added.`)
    this._waitForRemoteVideo(sid)
  }

  _onRemoteStreamRemoved (event, data, sid) {
    this.$log.log(`Remote stream for session ${sid} removed.`)
  }

  _onIceConnectionStateChanged (event, sid, sess) {
    this.$log.log('_onIceConnectionStateChanged')
    this.$log.log('ice state for', sid, sess.peerconnection.iceConnectionState)
    this.$log.log('sig state for', sid, sess.peerconnection.signalingState)
    this.$log.log(sess['initiator'])

    if (sess.peerconnection.iceConnectionState === 'connected') {
      this.$log.log('add new stream')
    } else if (sess.peerconnection.iceConnectionState === 'disconnected') {
      this.xmppConfig['connection'].jingle.sessions[sid].terminate('disconnected')
      // connection.jingle.sessions[sid].terminate('disconnected')
      this.$log.log('remove stream')
    // $scope.removeStream(sid)
    // manageDisconnectedSid(sid)
    } else if (sess.peerconnection.iceConnectionState === 'failed' || sess.peerconnection.iceConnectionState === 'closed') {
      this.$log.log('failed/closed stream')
    }
  }

  _noStunCandidates () {
    this.$log.error('webrtc did not encounter stun candidates, NAT traversal will not work')
  }

  _waitForRemoteVideo (sid) {
    this.$log.log('*********** Waiting for remote video... *******************')
    const sess = this.xmppConfig['connection'].jingle.sessions[sid]
    const videoTracks = sess.remoteStream.getVideoTracks()
    // const initiator = Strophe.getResourceFromJid(sess['initiator'])

    if (videoTracks.length > 0 && this.videoConfig['sids'][sid]) {
      // angular.element(document).trigger('callactive.jingle', [null, sid])
      const streamURL = window.URL.createObjectURL(sess.remoteStream)
      const trustedStreamURL = this.$sce.trustAsResourceUrl(streamURL)
      this.videoConfig['sourceStreams'][this.videoConfig['sids'][sid]] = trustedStreamURL
      this.$log.log('###################################################################')
      this.$log.log(this.videoConfig['sids'])
      this.$log.log(this.xmppConfig['connection'].jingle.sessions)
      this.$log.log('###################################################################')
      this.ChatRoomService.refreshScope()
    } else {
      setTimeout(() => {
        this._waitForRemoteVideo(sid)}, 500)
    }
  }
}
