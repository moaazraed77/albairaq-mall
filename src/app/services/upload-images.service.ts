import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage/storage';

@Injectable({
  providedIn: 'root'
})
export class UploadImagesService {

  constructor(private firestorage:AngularFireStorage) { }

 
}
