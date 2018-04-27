import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';

import { Observable } from '@firebase/util';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  tasksRef: AngularFireList<any>;
  tasks: Observable<any[]>;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public database: AngularFireDatabase
  ) {
    this.tasksRef = this.database.list('tasks');
    this.tasks = this.tasksRef.snapshotChanges().map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() })));
  }

  updateTask(task) {
    this.tasksRef.update(task.key, {
      title: task.title,
      done: !task.done
    });
  }
}
