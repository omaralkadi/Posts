import { Pipe, PipeTransform } from '@angular/core';
import { Follower } from '../services/models/followers/follower';

@Pipe({
  name: 'followersFilter'
})
export class FollowersFilterPipe implements PipeTransform {

  transform(allList:Follower[], searchWord: string): Follower[] {

    return allList.filter((follower)=>follower.name.toLowerCase().includes(searchWord.toLowerCase()));

  }

}
