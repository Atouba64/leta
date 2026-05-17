import React from 'react';
import ProfileScreenLayout from '../../components/ProfileScreenLayout';
import theme from '../../theme';

export default function RemoteProfile() {
  return <ProfileScreenLayout accentColor={theme.roleAccents.remote_tech} />;
}
