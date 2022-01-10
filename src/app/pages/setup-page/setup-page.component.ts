import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDbService } from 'src/app/services/user-db/user-db.service';

@Component({
  selector: 'app-setup-page',
  templateUrl: './setup-page.component.html',
  styleUrls: ['./setup-page.component.scss']
})
export class SetupPageComponent implements OnInit {

  setupForm: FormGroup
  avatars: String[] = ["avatar", "avatar1", "avatar2", "avatar3", "avatar4", "avatar5", "avatar6", "avatar7"]
  genres: String[] = ["Action", "Comedy", "Adventure", "Fantasy", "Biographical", "Horror", "Drama", "Romance", "SciFy", "Anime", "Western", "Crime", "Documentary", "Mystery", "Thriller"]

  private avatar: string = "avatar"
  private favGenres: string[] = []

  constructor(private formBuilder: FormBuilder, private router: Router, private userDB: UserDbService) {
    this.setupForm = this.formBuilder.group({
      username: new FormControl(''),
      age: new FormControl(0),
      gender: new FormControl('')
    })
  }

  ngOnInit(): void {
  }

  selectAvatar(avatar: String): void {
    if (this.avatar !== avatar.toString()) {
      this.avatar = avatar.toString()
    }
  }

  selectGenre(genre: String): void {
    if (this.favGenres.includes(genre.toString())) {
      let index = this.favGenres.indexOf(genre.toString())
      this.favGenres.splice(index, 1)
    } else {
      this.favGenres.push(genre.toString())
    }
  }

  finishRegistration(): void {
    if (this.setupForm.valid) {
      if (window.sessionStorage.getItem("user-setup-email")) {
        let email = window.sessionStorage.getItem("user-setup-email") || ''
        window.sessionStorage.clear()

        let username = this.setupForm.get("username")?.value
        let age = this.setupForm.get("age")?.value
        let sex = this.setupForm.get("gender")?.value

        this.userDB.updateUser(email, username, age, sex, this.avatar, this.favGenres)

        this.router.navigate(["/login"])
      }
    }
  }

}
