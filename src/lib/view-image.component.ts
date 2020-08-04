import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  AfterViewInit,
} from "@angular/core";

import * as Hammer from "hammerjs";

@Component({
  selector: "view-images",
  templateUrl: "view-image.template.html",
  styleUrls: ["view-image.scss"],
})
export class ViewImageComponent implements OnInit, AfterViewInit {
  @Input() images: _Image[] = [];
  @Input() index: number = 0;
  @Output() onDismiss = new EventEmitter<any>();
  @ViewChild("image") imageView: ElementRef;
  @ViewChild("container") container: ElementRef;

  public delta: number = 0;
  public deltaX: number = 0;
  public scale: number = 1;
  public loading = false;

  private dismissThreshold = 125;
  private minMoveThreshold = 25;
  private pinching = false;

  public testPinch: any;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const hammer = new Hammer(this.imageView.nativeElement);
    hammer.get("pinch").set({ enable: true });
    if (this.images.length > 1) {
      this.preLoad();
    }
  }

  private preLoad(): void {
    const preloadImages = [];
    for (const img of this.images) {
      const tmpImg = new Image();
      tmpImg.src = img.src;
      preloadImages.push(tmpImg);
    }
  }

  public pan(event): void {
    if (this.pinching) return;

    this.moveImage(event);
    if (Math.abs(event.deltaY) > this.minMoveThreshold) {
      this.delta = event.deltaY;
      this.scale = 1 - Math.abs(event.deltaY) / 1000;
    }
  }

  public click(event): void {
    event.stopPropagation();
  }

  public onPinch(event): void {
    this.pinching = true;
    this.scale = Math.min(event.scale, 3);
  }

  public onPinchEnd(event) {
    setTimeout(() => {
      this.pinching = false;
    }, 100);
  }

  public panend(event): void {
    if (Math.abs(event.deltaY) > this.dismissThreshold) {
      this.doDismiss();
    } else {
      this.reset();
    }
  }

  public swipe(event): void {
    this.loading = true;
    if (event.direction === 2) {
      this.changeIndex(1);
    } else if (event.direction === 4) {
      this.changeIndex(-1);
    }
  }

  private reset(): void {
    this.scale = 1;
    this.delta = 0;
    this.deltaX = 0;
    this.pinching = false;

    if (this.loading) {
      this.imageView.nativeElement.className = "reset-c";
      setTimeout(() => {
        this.imageView.nativeElement.className = "";
      }, 500);
    }
  }

  public onTap(event) {
    if (event.tapCount >= 2) {
      this.reset();
    }
  }

  private doDismiss(): void {
    if (this.delta > 0) {
      this.imageView.nativeElement.className = "img-dismiss-down";
    } else {
      this.imageView.nativeElement.className = "img-dismiss-up";
    }

    this.container.nativeElement.className = " container container-dismiss";

    setTimeout(() => {
      this.onDismiss.emit({ dismissValue: true });
    }, 300);
  }

  private changeIndex(value: number): void {
    if (this.index + value < 0) {
      this.index = this.images.length - 1;
    } else if (this.index + value > this.images.length - 1) {
      this.index = 0;
    } else {
      this.index += value;
    }
  }

  private moveImage(panEvent) {
    this.deltaX = panEvent.deltaX;
  }

  public imgOnLoading(event) {
    this.loading = false;
  }
}

interface _Image {
  src: string;
}
