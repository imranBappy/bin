"use client";

import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";

export default function DemoComp() {
  const { data } = useDemoData({
    dataSet: "Commodity",
    rowLength: 100,
    maxColumns: 6,
  });

  return (
      <DataGrid
        {...data}
        components={{
          Toolbar: GridToolbar,
        }}
        filterModel={{
          items: [
            {
              columnField: "commodity",
              operatorValue: "contains",
              value: "rice",
            },
          ],
        }}
      />
  );
}
