import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
export const ProductListColumns = [
  {
    label: "Product name",
    name: "name",
    options: {
      filter: true,
      sort: true,
      setCellHeaderProps: (value) => ({ style: { width: 200 } }),
      setCellProps: (value) => ({ style: { whiteSpace: "pre" } }),
    },
  },
  {
    label: "Measurement",
    name: "measure",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    label: "Unit Price",
    name: "price",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    label: "Actions",
    name: "Actions",
    options: {
      filter: false,
      sort: false,
      empty: true,
      setCellHeaderProps: () => ({
        style: {
          display: "flex",
          justifyContent: "center",
          flexDirection: "row-reverse",
        },
      }),
      setCellProps: () => ({
        style: {
          display: "flex",
          justifyContent: "center",
          flexDirection: "row-reverse",
        },
      }),
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <div style={{ display: "flex" }}>
            <IconButton
              onClick={() => window.editProduct(value, tableMeta, updateValue)}
              title="Edit a Product"
              color="secondary"
              aria-label="Edit a Product"
            >
              <Edit />
            </IconButton>
            <IconButton
              onClick={() =>
                window.deleteProduct(value, tableMeta, updateValue)
              }
              title="Delete a Product"
              color="secondary"
              aria-label="Delete a Product"
            >
              <Delete />
            </IconButton>
          </div>
        );
      },
    },
  },
];
