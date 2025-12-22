import { Component } from "@angular/core";
import { languages } from "../_config/languages.config";
import { LangService } from "../_services/lang/lang.service";
import { NgClass } from "@angular/common";
import { SharedModule } from "../_shared/shared.module";

@Component({
    selector: 'lang',
    standalone: true,
    imports: [
        SharedModule,
        NgClass
    ],
    template: `
        <!-- LANG -->
        <div class="relative" appClickOutside (clickOutside)="showLangs = false">
            <button (click)="showLangs = !showLangs" class="size-10 lg:size-12 border border-grey rounded-full flex items-center justify-center hover:border-primary-dark" [ngClass]="[showLangs ? 'bg-grey text-gray-700' : 'text-gray-500 hover:text-gray-700 hover:bg-grey']">
            <img src="/assets/flags/{{lang.currentLang?.country}}.svg" alt="" class="size-5 lg:size-6">
            </button>
            @if (showLangs) {
            <div class="shadow-sm absolute top-[calc(100%+5px)] right-0 z-40 min-w-40 space-y-1 rounded-2lg border border-gray-200 bg-white p-2 transition-all">
                @for (item of langs; track $index) {
                <button (click)="lang.setCurrentLang(item); showLangs = false" class="text-sm flex items-center gap-1.5 w-full rounded-sm px-3 py-2 text-left font-medium" [ngClass]="[lang.currentLang == item ? 'bg-primary/20 text-primary-dark' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700']">
                    <img src="/assets/flags/{{item?.country}}.svg" alt="" class="size-4">
                    {{'lang.'+item.lang | translate}}
                </button>
                }
            </div>
            }
        </div>
    `
})
export class LangComponent {
    public langs = languages;    
    showLangs: boolean = false;
    
    constructor(
        public lang: LangService
    ) {}
}