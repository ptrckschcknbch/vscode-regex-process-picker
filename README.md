# regex-process-picker

A replacement for the built in VS Code command `processPicker`, which allows filtering for a regular expression.

## Features

VS Code by default provides a command `processPicker`, which can be used in the `launch.json` file to pick the process to attach to from a list of running processes. However, this list can be quite long and usually one would need to type the name of the process to get it filtered.

This extension provides commands `regex-process-picker.pickProcessMatchingRegexList<index>`, which consideres the regular expression defined in settings `regex-process-picker.regexList<index>` for filtering the list of running processes (`<index>` being a number from 1 to 5).

Usage in `launch.json`:

```json
{
  "configurations": [
    {
      "name": "<Name>",
      "type": "<Type>",
      "request": "attach",
      "processId": "${command:regex-process-picker.pickProcessMatchingRegexList<index>}"
    }
  ]
}
```

## Requirements

None.

## Extension Settings

This extension contributes the following settings:

- `regex-process-picker.regexList1`: A list with regular expressions used by `pickProcessMatchingRegexList1`. A process will be selected if any of the regular expressions matches.
- `regex-process-picker.regexList2`: A list with regular expressions used by `pickProcessMatchingRegexList2`. A process will be selected if any of the regular expressions matches.
- `regex-process-picker.regexList3`: A list with regular expressions used by `pickProcessMatchingRegexList3`. A process will be selected if any of the regular expressions matches.
- `regex-process-picker.regexList4`: A list with regular expressions used by `pickProcessMatchingRegexList4`. A process will be selected if any of the regular expressions matches.
- `regex-process-picker.regexList5`: A list with regular expressions used by `pickProcessMatchingRegexList5`. A process will be selected if any of the regular expressions matches.
- `regex-process-picker.skipUserDialogIfOnlyOneOption`: Whether to skip the user dialog if only one process matches the regular expression.

## Known Issues

None.

## Release Notes

### 0.0.1

Initial release
