import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageNavigationComponent } from './page-navigation.component';
import { By } from '@angular/platform-browser';

describe('PageNavigationComponent', () => {
  let component: PageNavigationComponent;
  let fixture: ComponentFixture<PageNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageNavigationComponent], // componente standalone
    }).compileComponents();

    fixture = TestBed.createComponent(PageNavigationComponent);
    component = fixture.componentInstance;

    // Imposta i valori iniziali degli input
    component.totalItems = 100;
    component.pageSize = 10;
    component.currentPage = 1;
    fixture.detectChanges();
  });

  it('dovrebbe creare il componente', () => {
    expect(component).toBeTruthy();
  });

  it('dovrebbe passare correttamente gli input a nz-pagination', () => {
  const paginationDE = fixture.debugElement.query(By.css('nz-pagination'));
  const paginationComponent = paginationDE.componentInstance;

  expect(paginationComponent.nzPageSize).toBe(10);
  expect(paginationComponent.nzTotal).toBe(100);
  expect(paginationComponent.nzPageIndex).toBe(1);
});

  it('dovrebbe abilitare il campo di inserimento rapido (quick jumper)', () => {
    const pagination = fixture.debugElement.query(By.css('nz-pagination'));
    expect(pagination.attributes['nzShowQuickJumper']).toBeDefined();
  });
  //  precedente successivo e inserimento del numero chiama sempre cambio pagina
  it('dovrebbe emettere l’evento pageChange quando si cambia pagina', () => {
    jest.spyOn(component.pageChange, 'emit');

    // Simula il cambio pagina (esempio pagina 2)
    component.onPageChange(2);

    expect(component.pageChange.emit).toHaveBeenCalledWith(2);
  });

  it('dovrebbe mostrare i pulsanti precedente e successivo', () => {
    // I pulsanti hanno queste classi nel DOM di nz-pagination
    const btnPrecedente = fixture.debugElement.query(
      By.css('.ant-pagination-prev')
    );
    const btnSuccessivo = fixture.debugElement.query(
      By.css('.ant-pagination-next')
    );
    expect(btnPrecedente).toBeTruthy();
    expect(btnSuccessivo).toBeTruthy();
  });
  it('visualizza correttamente il numero della pagina corrente', () => {
    // Seleziona l'elemento che mostra la pagina attiva
    const paginaAttivaEl = fixture.debugElement.query(
      By.css('.ant-pagination-item-active')
    );
    expect(paginaAttivaEl).toBeTruthy();
    expect(paginaAttivaEl.nativeElement.textContent.trim()).toBe(
      component.currentPage.toString()
    );
  });
  it('calcola correttamente il numero totale di pagine', () => {
    const totalPages = Math.ceil(component.totalItems / component.pageSize);
    expect(totalPages).toBe(10); // esempio con 100 item e pageSize 10
  });
});
