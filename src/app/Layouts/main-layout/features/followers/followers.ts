import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/Auth/auth-service';
import { Follower } from '../../../../core/services/models/followers/follower';
import { ToastrService } from 'ngx-toastr';
import { FollowersSharedService } from '../../../../shared/followers/followers-shared-service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-followers',
  imports: [],
  templateUrl: './followers.html',
  styleUrl: './followers.css',
})
export class Followers implements OnInit {

  private readonly auth = inject(AuthService);
  private readonly toastr = inject(ToastrService);
  private readonly followersService = inject(FollowersSharedService);

  followersList: Follower[] = [];

  loadingFollowerIds = new Set<string>();

  ngOnInit(): void {
    this.followersService.followers$.subscribe({
      next: followers => {
        this.followersList = followers;
      }
    });

    this.getFollowers();
  }
  
  getFollowers(): void {
    this.auth.getFollowers().subscribe({
      next: response => {
        console.log('Suggestions response:', response);

        const suggestions = (response.data?.suggestions ?? []).map(
          (follower: Follower) => ({
            ...follower,
            isFollowing: follower.isFollowing ?? false
          })
        );

        this.followersService.setFollowers(suggestions);
      },
      error: error => {

        const message =
          error?.error?.message ||
          `Failed to load suggestions. Status: ${error?.status ?? 'unknown'}`;
      }
    });
  }

  makeFollow(followerId: string): void {
    if (this.loadingFollowerIds.has(followerId)) {
      return;
    }

    this.loadingFollowerIds.add(followerId);

    this.auth.makeFollow(followerId)
      .pipe(
        finalize(() => {
          this.loadingFollowerIds.delete(followerId);
        })
      )
      .subscribe({
        next: response => {
          const following = response.data.following;

          this.followersService.updateFollowingState(
            followerId,
            following
          );

          if (following) {
            this.toastr.success('You are now following the user.');
          } else {
            this.toastr.info('You unfollowed the user.');
          }
        },
        error: () => {
          this.toastr.error('Failed to update follow status.');
        }
      });
  }

  isLoading(followerId: string): boolean {
    return this.loadingFollowerIds.has(followerId);
  }

}