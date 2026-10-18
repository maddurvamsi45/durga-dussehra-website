import test from "node:test";
import assert from "node:assert/strict";
import { blessings, quotes, gallery, days, navItems } from "../src/data.js";
test("four blessing cards are populated",()=>{assert.equal(blessings.length,4);assert.ok(blessings.every(x=>x.title&&x.text&&x.mantra));});
test("quotes contain text and attribution",()=>{assert.ok(quotes.length>=5);assert.ok(quotes.every(x=>x.text.length>30&&x.author));});
test("gallery images include alt text and source credits",()=>{assert.ok(gallery.length>=5);assert.ok(gallery.every(x=>x.image.startsWith("https://")&&x.alt&&x.credit&&x.source));});
test("Navratri guide includes nine forms",()=>{assert.equal(days.length,9);assert.ok(days.every(x=>x[0]&&x[1]));});
test("navigation links point to section IDs",()=>{assert.ok(navItems.includes("Home"));assert.ok(navItems.every(x=>/^[A-Za-z]+$/.test(x)));});