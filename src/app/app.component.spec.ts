import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "./app.component";
import { By } from "@angular/platform-browser";

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    declarations: [AppComponent]
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  })

  it('should create the app', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should create and render dummy in overlay', () => {
    const viaPortal = fixture.debugElement.query(By.css('[data-test="via-portal"]'));
    expect(viaPortal).toBeTruthy();

    viaPortal.nativeElement.click();
    fixture.detectChanges();

    const dummy = document.querySelector("app-dummy");
    expect(dummy).toBeTruthy();
    expect(dummy!.innerHTML).toContain("dummy works!");
  });

  it('should create and render dummy with ComponentFactoryResolver', () => {
    const viaResolver = fixture.debugElement.query(By.css('[data-test="via-resolver"]'));
    expect(viaResolver).toBeTruthy();

    viaResolver.nativeElement.click();
    fixture.detectChanges();

    const dummy = document.querySelector("app-dummy");
    expect(dummy).toBeTruthy();
    expect(dummy!.innerHTML).toContain("dummy works!");
  });

  it('should create and render dummy with ViewContainerRev', () => {
    const viaContainerRef = fixture.debugElement.query(By.css('[data-test="via-container-ref"]'));
    expect(viaContainerRef).toBeTruthy();

    viaContainerRef.nativeElement.click();
    fixture.detectChanges();

    const dummy = document.querySelector("app-dummy");
    expect(dummy).toBeTruthy();
    expect(dummy!.innerHTML).toContain("dummy works!");
  });

  it('should create and render dummy in overlay with dirty hack', async () => {
    const viaPortal = fixture.debugElement.query(By.css('[data-test="via-portal"]'));
    expect(viaPortal).toBeTruthy();

    viaPortal.nativeElement.click();
    fixture.detectChanges();

    await new Promise(resolve => setTimeout(resolve, 0))

    const dummy = document.querySelector("app-dummy");
    expect(dummy).toBeTruthy();
    expect(dummy!.innerHTML).toContain("dummy works!");
  });

});
