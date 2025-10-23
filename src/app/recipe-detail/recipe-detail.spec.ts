import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeDetail } from './recipe-detail';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { Recipe } from '../recipe';

// 建立我們的替身 (Mocks)
// 1. 定義一個假的食譜物件，這將是我們期望在範本中看到的資料
const FAKE_RECIPE = {
  id: 1,
  name: 'Mock Recipe Title',
  description: 'A delicious mock recipe for testing.',
  imgUrl: 'fake-url.jpg',
  isFavorite: true,
  ingredients: []
};

// 2. 建立一個 RecipeService 的模擬物件
// jasmine.createSpyObj 會建立一個物件，它有我們指定的方法，且這些方法都是「間諜 (spies)」
// 這讓我們可以追蹤它們是否被呼叫，並控制它們的回傳值
let mockRecipeService = jasmine.createSpyObj('RecipeService', ['getRecipeById']);

// 3. 建立一個 ActivatedRoute 的模擬物件
// 我們需要模擬 ActivatedRoute.snapshot.paramMap.get('id') 這個呼叫鏈
let mockActivatedRoute = {
  snapshot: {
    paramMap: {
      get: (key: string) => {
        // 當元件試圖獲取 'id' 參數時，我們總是回傳 '1'
        if (key === 'id') {
          return '1';
        }
        return null;
      }
    }
  }
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

  it('should display the recipe name and description from the mock service', () => {
    // ARRANGE (安排):
    // 設定我們的模擬服務：當 getRecipeById 被以任何參數呼叫時，
    // 讓它回傳我們預先定義好的 FAKE_RECIPE 物件。
    mockRecipeService.getRecipeById.and.returnValue(FAKE_RECIPE);
  
    // ACT (執行):
    // 觸發 Angular 的變更偵測。這會執行元件的 ngOnInit (讀取路由、呼叫服務)，
    // 並將資料渲染到 HTML 範本中。
    fixture.detectChanges();
  
    // ASSERT (斷言):
    // 取得渲染後的 HTML 元素
    const compiled = fixture.nativeElement as HTMLElement;
    
    // 使用 querySelector 來尋找顯示食譜名稱的元素 (例如 h2) 並驗證其內容
    const titleElement = compiled.querySelector('h2');
    expect(titleElement?.textContent).toContain('Mock Recipe Title');
  
    // 尋找顯示食譜描述的元素 (例如 p) 並驗證其內容
    const descriptionElement = compiled.querySelector('p');
    expect(descriptionElement?.textContent).toContain('A delicious mock recipe for testing.');
  });
  
});
