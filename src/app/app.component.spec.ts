import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UserComponent } from './user/user.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, HomeComponent, AboutComponent, UserComponent],
      imports: [RouterTestingModule.withRoutes([
        { path: '', component: HomeComponent },
        { path: 'about', component: AboutComponent },
        { path: 'user/:id', component: UserComponent }
      ])],  // Ensure RouterTestingModule is correctly configured
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture.detectChanges();
  });

  describe('boundary', () => {
    it('should create the app component', () => {
      expect(component).toBeTruthy();
    });

    it('should have a <router-outlet> in the template', () => {
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('router-outlet')).not.toBeNull();
    });

    it('should render the navigation links correctly', () => {
      const compiled = fixture.nativeElement;
      const links = compiled.querySelectorAll('nav a');
      expect(links.length).toBe(4);  // We expect 4 links

      expect(links[0].getAttribute('routerLink')).toBe('/');  // Home link
      expect(links[1].getAttribute('routerLink')).toBe('/about');  // About link
      expect(links[2].getAttribute('routerLink')).toBe('/user/1');  // User 1 link
      expect(links[3].getAttribute('routerLink')).toBe('/user/2');  // User 2 link
    });

    it('should navigate to "about" when the "About" link is clicked', async () => {
      const link = fixture.nativeElement.querySelector('a[href="/about"]');
      link.click();
      fixture.detectChanges();
      await fixture.whenStable();  // Wait for async tasks like routing to complete
      expect(location.path()).toBe('/about');
    });

    it('should navigate to "user/1" when the "User 1" link is clicked', async () => {
      const link = fixture.nativeElement.querySelector('a[href="/user/1"]');
      link.click();
      fixture.detectChanges();
      await fixture.whenStable();  // Wait for async tasks like routing to complete
      expect(location.path()).toBe('/user/1');
    });

    it('should navigate to "user/2" when the "User 2" link is clicked', async () => {
      const link = fixture.nativeElement.querySelector('a[href="/user/2"]');
      link.click();
      fixture.detectChanges();
      await fixture.whenStable();  // Wait for async tasks like routing to complete
      expect(location.path()).toBe('/user/2');
    });
  });
});
