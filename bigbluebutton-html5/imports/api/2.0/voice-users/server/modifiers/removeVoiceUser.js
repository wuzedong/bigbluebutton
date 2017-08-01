import { check } from 'meteor/check';
import Logger from '/imports/startup/server/logger';
import VoiceUsers from '/imports/api/2.0/voice-users';

export default function removeVoiceUser(meetingId, voiceUser) {
  check(meetingId, String);
  check(voiceUser, {
    voiceConf: String,
    voiceUserId: String,
    intId: String,
  });

  const { intId } = voiceUser;

  const selector = {
    meetingId,
    intId,
  };

  const modifier = {
    muted: false,
    talking: false,
    listenOnly: false,
  };

  const cb = (err) => {
    if (err) {
      return Logger.error(`Add voice user=${intId}: ${err}`);
    }

    return Logger.verbose(`Add voice user=${intId} meeting=${meetingId}`);
  };

  return VoiceUsers.update(selector, modifier, cb);
}
