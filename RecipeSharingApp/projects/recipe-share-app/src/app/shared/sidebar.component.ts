import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [CommonModule, RouterModule],
    template: `
    <aside class="w-72 border-r border-gray-200 flex flex-col">
      <!-- Logo -->
      <div class="flex items-center justify-between p-4 border-b border-gray-100">
        <a routerLink="/" class="flex items-center gap-2">
          <div class="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
            <span class="text-white text-xl font-bold">R</span>
          </div>
          <span class="text-xl font-bold text-gray-800">Recipe Share</span>
        </a>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 p-4">
        <ul class="space-y-1">
          <li>
            <a routerLink="/" routerLinkActive="text-orange-500 font-medium bg-orange-50" [routerLinkActiveOptions]="{exact: true}"
               class="flex items-center gap-3 px-3 py-2.5 text-gray-700 rounded-lg hover:bg-orange-50 transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Trang chủ
            </a>
          </li>
          <li>
            <a routerLink="/search" routerLinkActive="text-orange-500 font-medium bg-orange-50"
               class="flex items-center gap-3 px-3 py-2.5 text-gray-700 rounded-lg hover:bg-orange-50 transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Tìm kiếm
            </a>
          </li>
          <li>
            <a routerLink="/queries" routerLinkActive="text-orange-500 font-medium bg-orange-50"
               class="flex items-center gap-3 px-3 py-2.5 text-gray-700 rounded-lg hover:bg-orange-50 transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Truy vấn đặc biệt
            </a>
          </li>
          <li>
            <a href="#" class="flex items-center gap-3 px-3 py-2.5 text-gray-700 rounded-lg hover:bg-orange-50 transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              Món Ngon Của Bạn
            </a>
          </li>
        </ul>

        <!-- Info text -->
        <div class="mt-6 px-3 text-sm text-gray-500 leading-relaxed">
          Để bắt đầu tạo kho lưu trữ món ngon của riêng bạn, vui lòng
          <a href="#" class="text-gray-700 underline hover:text-orange-500">đăng ký</a> hoặc
          <a href="#" class="text-gray-700 underline hover:text-orange-500">đăng nhập</a>.
        </div>
      </nav>
    </aside>
  `
})
export class SidebarComponent { }
