export type Outfit='mint'|'sunshine';
export type GameSave={outfit:Outfit;hair:number;coins:number;visited:string[];lastPlace:string};
export const DEFAULT_SAVE:GameSave={outfit:'mint',hair:0,coins:0,visited:[],lastPlace:'world'};
export const PLACE_IDS=['home','cafe','studio','park','garage','plaza'] as const;
export type PlaceId=typeof PLACE_IDS[number];
export function safeLoad(raw:string|null):GameSave{if(!raw)return{...DEFAULT_SAVE,visited:[]};try{const v=JSON.parse(raw) as Partial<GameSave>;return{outfit:v.outfit==='sunshine'?'sunshine':'mint',hair:Number.isInteger(v.hair)?Math.max(0,Math.min(2,Number(v.hair))):0,coins:Number.isFinite(v.coins)?Math.max(0,Math.floor(Number(v.coins))):0,visited:Array.isArray(v.visited)?v.visited.filter((x):x is string=>typeof x==='string'&&(PLACE_IDS as readonly string[]).includes(x)):[],lastPlace:typeof v.lastPlace==='string'&&(PLACE_IDS as readonly string[]).includes(v.lastPlace)?v.lastPlace:'world'};}catch{return{...DEFAULT_SAVE,visited:[]};}}
export function nextRingIndex(i:number,d:-1|1,n:number):number{return(i+d+n)%n;}