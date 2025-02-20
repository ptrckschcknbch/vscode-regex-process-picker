import * as assert from "assert";

import { ProcessDescriptor } from "ps-list-commonjs";
import * as vscode from "vscode";
import { filterProcessesForRegexList } from "../extension";

suite("Extension Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");

  const processList: ProcessDescriptor[] = [
    { pid: 0, name: "Process1", ppid: 0 },
    { pid: 0, name: "Process2", ppid: 0 },
  ];

  test("One regex matching one process", () => {
    const regexList: string[] = ["Process1"];
    const filteredProcesses = filterProcessesForRegexList(
      processList,
      regexList
    );
    assert.strictEqual(filteredProcesses.length, 1);
    assert.strictEqual(filteredProcesses[0].name, "Process1");
  });

  test("One regex matching two processes", () => {
    const regexList: string[] = ["Process"];
    const filteredProcesses = filterProcessesForRegexList(
      processList,
      regexList
    );
    assert.strictEqual(filteredProcesses.length, 2);
  });

  test("Two regex matching two processes", () => {
    const regexList: string[] = ["Process1", "Process2"];
    const filteredProcesses = filterProcessesForRegexList(
      processList,
      regexList
    );
    assert.strictEqual(filteredProcesses.length, 2);
  });

  test("Empty regex list", () => {
    const regexList: string[] = [];
    const filteredProcesses = filterProcessesForRegexList(
      processList,
      regexList
    );
    assert.strictEqual(filteredProcesses.length, 2);
  });

  test("Regex with empty string", () => {
    const regexList: string[] = [""];
    const filteredProcesses = filterProcessesForRegexList(
      processList,
      regexList
    );
    assert.strictEqual(filteredProcesses.length, 2);
  });
});
