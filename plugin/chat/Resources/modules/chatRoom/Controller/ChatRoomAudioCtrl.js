/*
 * This file is part of the Claroline Connect package.
 *
 * (c) Claroline Consortium <consortium@claroline.net>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import $ from 'jquery'

export default class ChatRoomAudioCtrl {

  constructor($state, $log, ChatRoomService) {
    this.$state = $state
    this.$log = $log
    this.ChatRoomService = ChatRoomService
    this.chatRoomConfig = ChatRoomService.getConfig()
    this.xmppConfig = ChatRoomService.getXmppConfig()
    this.messages = ChatRoomService.getMessages()
    this.oldMessages = ChatRoomService.getOldMessages()
    this.users = ChatRoomService.getUsers()
    this.bannedUsers = ChatRoomService.getBannedUsers()
    this.input = ''
  }
}
