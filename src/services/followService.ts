import FollowRequestModel, { FollowRequest } from '../database/models/followReq';

export async function getAcceptedReceivers(userId: string): Promise<{ acceptedReceiverIds: string[]; acceptedReceiverCount: number }> {
  try {
    const followRequests: FollowRequest[] = await FollowRequestModel.find({
      senderId: userId,
      status: 'accepted',
    }).exec();

    const acceptedReceiverIds: string[] = followRequests.map((request) => request.receiverId);
    const acceptedReceiverCount: number = acceptedReceiverIds.length;

    return {
      acceptedReceiverIds,
      acceptedReceiverCount,
    };
  } catch (err) {
    console.error('Error fetching accepted receivers:', err);
    throw new Error('Internal Server Error');
  }
}
