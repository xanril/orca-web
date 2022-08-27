import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, of } from "rxjs";
import { environment } from "../../environments/environment";
import { Room } from "../models/room.model";

@Injectable({ providedIn: 'root' })
export class RoomsService {
  constructor(private http:HttpClient) {}

  getRooms() {
    return this.http.get<Room[]>(environment.apiBaseUrl + '/rooms');
  }

  addRoom(room: Room) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    return this.http.post<Room>(environment.apiBaseUrl + '/room', JSON.stringify(room), {
      headers: headers,
    });
  }

  deleteRoom(id: number) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    return this.http.delete<number>(environment.apiBaseUrl + '/room/' + id).pipe(
      map((response) => {
        return id;
      })
    );
  }

  updateRoom(updatedRoom: Room) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    return this.http
      .put<Room>(
        environment.apiBaseUrl + '/room/' + updatedRoom.id,
        JSON.stringify(updatedRoom),
        {
          headers: headers,
        }
      )
      .pipe(
        map((response) => {
          return updatedRoom;
        })
      );
  }
}