import React, { Component } from "react";
import {
  Card,
  Icon,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";

const TableCard = () => {
  const feedbackList = [
    {
      name: "Sam Smith",
      phone: "07012345678",
      comments: "Good Product"
    },
    {
      name: "Olasukanmi Daniel",
      phone: "07012345678",
      comments: "On time Delivery"
    },
    {
      name: "Favour Michael",
      phone: "07012345678",
      comments: "Transparent App"
    },
    {
      name: "Opara Daniel",
      phone: "07012345678",
      comments: "On time Delivery"
    },
    {
      name: "Favour Michael",
      phone: "07012345678",
      comments: "The rice was delicious"
    }
  ];

  return (
    <Card elevation={3} className="pt-20 mb-24">
      <div className="card-title px-24 mb-12">Feed Back</div>
      <div className="overflow-auto">
        <Table className="product-table">
          <TableHead>
            <TableRow>
              <TableCell className="px-24" colSpan={2}>
                Customer Name
              </TableCell>
              <TableCell className="px-0" colSpan={2}>
                Phone Number
              </TableCell>
              <TableCell className="px-0" colSpan={4}>
                Comments
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {feedbackList.map((feedback, index) => (
              <TableRow key={index}>
                <TableCell className="px-0 capitalize" colSpan={2} align="left">
                  <div className="flex flex-middle">
                      <p className="m-0 ml-8">{feedback.name}</p>
                  </div>
                </TableCell>
                <TableCell className="px-0 capitalize" align="left" colSpan={2}>
                <small className="border-radius-4 bg-secondary text-white px-8 py-2 ">
                        {feedback.phone}
                      </small>
                </TableCell>

                <TableCell className="px-0 capitalize" colSpan={4} align="left">
                  <div className="flex flex-middle">
                      <p className="m-0 ml-8">{feedback.comments}</p>
                  </div>
                </TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default TableCard;
