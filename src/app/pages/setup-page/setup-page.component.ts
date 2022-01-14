import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { UserDbService } from 'src/app/services/user-db/user-db.service';

@Component({
  selector: 'app-setup-page',
  templateUrl: './setup-page.component.html',
  styleUrls: ['./setup-page.component.scss']
})
export class SetupPageComponent implements OnInit {

  setupForm: FormGroup
  avatars: String[] = ["avatar", "avatar1", "avatar2", "avatar3", "avatar4", "avatar5", "avatar6", "avatar7"]
  genres: String[]

  selectedAvatar: string = "avatar"
  selectedGenres: string[] = []

  constructor(private formBuilder: FormBuilder, private router: Router, private userDB: UserDbService, private store: Store<AppState>) {
    this.setupForm = this.formBuilder.group({
      username: new FormControl(''),
      age: new FormControl(0),
      gender: new FormControl('None')
    })

    this.store.select("genres").subscribe((items: any) => {
      this.genres = [...items][0]
    })
  }

  ngOnInit(): void {
  }

  selectAvatar(avatar: String): void {
    if (this.selectedAvatar !== avatar.toString()) {
      this.selectedAvatar = avatar.toString()
    }
  }

  isAvatarSelected(avatar: String): boolean {
    return this.selectedAvatar == avatar.toString()
  }

  selectGenre(genre: String): void {
    if (this.selectedGenres.includes(genre.toString())) {
      let index = this.selectedGenres.indexOf(genre.toString())
      this.selectedGenres.splice(index, 1)
    } else {
      this.selectedGenres.push(genre.toString())
    }
  }

  isGenreSelected(genre: String): boolean {
    return this.selectedGenres.includes(genre.toString())
  }

  finishRegistration(): void {
    if (this.setupForm.valid && window.sessionStorage.getItem("user-setup-email")) {
      let user = {
        email: window.sessionStorage.getItem("user-setup-email") || '',
        username: this.setupForm.get("username")?.value,
        age: this.setupForm.get("age")?.value,
        sex: this.setupForm.get("gender")?.value,
        avatar: this.selectedAvatar,
        favGenres: this.selectedGenres
      }
      window.sessionStorage.clear()

      // this.userDB.updateUser(user)
      // this.router.navigate(["/login"])

      this.userDB.updateUser(user).subscribe(result => {
        console.log(result)
        this.router.navigate(["/login"])
      })
    }
  }
}
