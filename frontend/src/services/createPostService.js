import { getPostsRoute } from './apiRoutes';

/* eslint-disable no-underscore-dangle */
export class SubmitPostError extends Error {}

export default async (title, body) => {
  const parameters = {
    title,
    body,
  };

  const requestBody = JSON.stringify(parameters);

  const response = await fetch(getPostsRoute, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    method: 'POST',
    body: requestBody,
  });

  if (!response.ok) {
    const { message } = await response.json();
    if (message.includes('is required')) {
      throw new SubmitPostError('Please ensure all fields are filled in');
    }
    throw new SubmitPostError(message);
  }

  return (await response.json())._id;
};
