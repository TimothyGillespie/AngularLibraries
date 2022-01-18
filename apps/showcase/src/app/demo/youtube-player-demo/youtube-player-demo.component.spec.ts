import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YouTubePlayerDemoComponent } from './youtube-player-demo.component';

describe('YoutubePlayerDemoComponent', () => {
  let component: YouTubePlayerDemoComponent;
  let fixture: ComponentFixture<YouTubePlayerDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YouTubePlayerDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YouTubePlayerDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
