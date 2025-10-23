import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeDetail } from './recipe-detail';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { Recipe } from '../recipe';

// 建立我們的替身 (Mocks)
// 1. 建立 Recipe 服務的替身
// 我們只需要模擬 getRecipe 方法，讓它回傳一個我們指定的假食譜
const mockRecipeService = {
  getRecipe: (id: number) => {
    // 回傳一個固定的、可預測的食譜物件
    return {
      id: 1,
      name: '測試用的義大利麵',
      description: '一道美味的測試菜餚',
      imgUrl: '',
      isFavorite: true,
      ingredients: [],
    };
  },
};

// 2. 建立 ActivatedRoute 的替身
// 我們需要模擬 paramMap，它是一個 Observable，會發出我們指定的 id
const mockActivatedRoute = {
  // paramMap 是一個 Observable，所以我們用 of() 來建立一個會立即發出值的 Observable
  paramMap: of(convertToParamMap({ id: '1' })),
};

// 包含一組相關的測試
describe('RecipeDetail', () => {
  // 被測試的元件
  let fixture: ComponentFixture<RecipeDetail>;
  // fixture.componentInstance 的簡寫，class 實例
  let component: RecipeDetail;
  // 宣告一個變數來存放 HTML 元素
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    // TestBed 建立一個隔離的環境，使測試不影響應用程式的其他部分
    await TestBed.configureTestingModule({
      imports: [
        RecipeDetail,
      ],
      providers: [
        {
          provide: Recipe, 
          useValue: mockRecipeService
        },
        {
          provide: ActivatedRoute, 
          useValue: mockActivatedRoute
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
    nativeElement = fixture.nativeElement;
  });

  // 測試案例，一個特定行為
  it('should create', () => {
    // 用來建立一個「斷言 (assertion)」。用它來檢查某個值是否符合預期
    expect(component).toBeTruthy();
  });

  // 是否出現對應標題
  it('should display recipe name after fetching from route param', () => {
    const h2Element = nativeElement.querySelector('h2')!;
    const h2Content = h2Element.textContent;

    expect(h2Content).toContain('Spaghetti Carbonara');
  });

  // 初始「份量」為 1
  it('should display 1 in initial servings', () => {
    fixture.detectChanges();

    const h3Element = nativeElement.querySelector('h3')!;
    expect(h3Element.textContent).toContain('1');
  });

  // 添加分量為 2
  it('should display 2 on add-button click', () => {
    const button = nativeElement.querySelector('[data-testid="add-button"]')! as HTMLElement;
    button.click();
    fixture.detectChanges();

    const h3Element = nativeElement.querySelector('h3')!;
    expect(h3Element.textContent).toContain('2');
  });

    // 減少分量為 1
    it('should display 1 on minus-button click', () => {
      component['servings'].set(2);
      fixture.detectChanges();

      const button = nativeElement.querySelector('[data-testid="minus-button"]')! as HTMLElement;
      button.click();
      fixture.detectChanges();
  
      const h3Element = nativeElement.querySelector('h3')!;
      expect(h3Element.textContent).toContain('1');
    });
});
