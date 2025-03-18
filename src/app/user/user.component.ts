import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';  // Import Subscription to handle observable

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: []
})
export class UserComponent implements OnInit {
  userId: string | null = null;  // Allow null as the initial value
  private routeSub: Subscription | undefined;  // Create a subscription to handle route changes

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Subscribe to paramMap to get route changes
    this.routeSub = this.route.paramMap.subscribe(params => {
      this.userId = params.get('id');  // Update userId whenever the route parameter changes
    });
  }

  // Clean up the subscription when the component is destroyed to prevent memory leaks
  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
