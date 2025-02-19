# regex-process-picker

A replacement for the built in VS Code command `processPicker`, which allows filtering for a regular expression.

## Features

VS Code by default provides a command `processPicker`, which can be used in the `launch.json` file to pick the process to attach to from a list of running processes. However, this list can be quite long and usually one would need to type the name of the process to get it filtered.

This extension provides a command `regex-process-picker.pickProcessMatchingRegex`, which consideres the regular expression defined in setting `regex-process-picker.regex` for filtering the list of running processes.

Usage in `launch.json`:

```json
{
  "configurations": [
    {
      "name": "<Name>",
      "type": "<Type>",
      "request": "attach",
      "processId": "${command:regex-process-picker.pickProcessMatchingRegex}"
    }
  ]
}
```

## Requirements

None.

## Extension Settings

This extension contributes the following settings:

- `regex-process-picker.regex`: Set the regular expression, which is used to filter the running processes.

## Known Issues

None.

## Release Notes

### 0.0.1

Initial release
