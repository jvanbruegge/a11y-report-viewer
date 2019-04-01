# Testing area

## Generate a report

This requires the `accessible-pipeline` module. This can be installed via `npm i -g accessible-pipeline`.

Run the following:

```sh
  DEBUG_LOG_PRETTY=true accessible-pipeline run <your sites base url including protocol here> --ci
```

This generates a json report and state file, the report is what you will upload into the viewer.

## Upload

Run the app by running `npm run start`. This will spin up a server on port `process.env.PORT` in production and `3000` locally.

upload the `report.json` file using the file input and click submit and you will see your report overview.

## Upcoming features

- Base url input functionality so no manual report generation is required
- Error messages for upload and processing issues
- Frontend work

## Notes

It's not perfect but it works and can be tidied later. I have a designer helping me mock up a proper flow for this. Any issues or ideas, please comment them in the repo in the issues tab.
