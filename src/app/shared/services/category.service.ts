import { AngularFireDatabase} from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { FirebaseDatabase } from 'angularfire2';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }
  getAll() {
    return this.db.list('/categories', ref => ref.orderByChild('name')).snapshotChanges();
  }
}
