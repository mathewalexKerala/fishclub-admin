
'use server';

import { createClient } from '@/supabase/server';

type UserTokenData = {
  expo_notification_token: string | null;
};

async function sendPushNotification({
  expoPushToken,
  title,
  body,
}: {
  expoPushToken: string;
  title: string;
  body: string;
}) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title,
    body,
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

export const getUserNotificationToken = async (userId: string): Promise<UserTokenData | null> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('users')
    .select('expo_notification_token')
    .eq('id', userId)
    .single();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data ? data : null;
};

export const sendNotification = async (userId: string, status: string) => {
  const tokenData = await getUserNotificationToken(userId);

  if (!tokenData || !tokenData.expo_notification_token) {
    console.log('No valid expo_notification_token found.');
    return;
  }

  await sendPushNotification({
    expoPushToken: tokenData.expo_notification_token,
    title: 'Your Order Status',
    body: `Your order is now ${status}`,
  });
};
