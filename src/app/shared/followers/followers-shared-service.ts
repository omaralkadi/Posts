import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Follower } from '../../core/services/models/followers/follower';

@Injectable({
  providedIn: 'root',
})
export class FollowersSharedService {

  private readonly followersSubject =
    new BehaviorSubject<Follower[]>([]);

  readonly followers$ =
    this.followersSubject.asObservable();

  setFollowers(followers: Follower[]): void {
    this.followersSubject.next(followers);
  }

  updateFollowingState(
    followerId: string,
    following: boolean
  ): void {

    const updatedFollowers =
      this.followersSubject.value.map(follower =>
        follower._id === followerId
          ? {
              ...follower,
              isFollowing: following
            }
          : follower
      );

    this.followersSubject.next(updatedFollowers);
  }
}