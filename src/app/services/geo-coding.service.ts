import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeoCodingService {
  private nominatimUrl = 'https://nominatim.openstreetmap.org/search';

  constructor(private http: HttpClient) {}

  geocodeAddress(address: string): Observable<[number, number] | null> {
    const params = {
      q: address,
      format: 'json',
      limit: '1'
    };

    return this.http.get(this.nominatimUrl, { params }).pipe(
      map((response: any) => {
        if (response && response.length > 0) {
          const lat = parseFloat(response[0].lat);
          const lon = parseFloat(response[0].lon);
          return [lat, lon];
        }
        return null;
      })
    );
  }
}