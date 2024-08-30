"use client";
import {
  Accordion,
  AccordionItem,
  CheckboxGroup,
  Checkbox,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Card,
  CardBody,
  RadioGroup,
  Radio
} from "@nextui-org/react";
import { Feature } from "@/types";
import { useState } from "react";

interface FeatureModalProps {
    feature: Feature | null;
  }



export default function Leaderboard({feature} : FeatureModalProps) {
    
  const radioDict:any = {
    "total-xp" : "Total XP",
    "tennis-level" : "Tennis Level",
    "win-loss" : "Win Loss"
  }

  const [radioState, setRadioState] =  useState('total-xp')
  

  const onRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    setRadioState(e.target.value)

  }
  
  
  return (

    <div className="flex justify-start content-start place-content-start">
      <Card className="flex m-2 text-nowrap min-w-[35vh] ">
        <CardBody>
          <div>
            <RadioGroup className="p-4" label="Leaderboard Type" onChange={onRadioChange} color="success"defaultValue="total-xp">
              <Radio className="text-sm" value="total-xp" >Total XP</Radio>
              <Radio value="tennis-level">Tennis Level</Radio>
              <Radio value="win-loss">Win/Loss</Radio>
            </RadioGroup>
          </div>

          <Accordion isCompact variant="splitted" selectionMode="multiple">
            <AccordionItem key="1" title="Tennis Court"> 
              <CheckboxGroup >
                <Checkbox>{feature?.properties.PARKNAME || feature?.properties.CLUB}</Checkbox>
              </CheckboxGroup>
            </AccordionItem>
            <AccordionItem key="3" title="City">
              <RadioGroup defaultValue="city-ottawa" defaultChecked={true} color="success">
                <Radio value="city-ottawa">Ottawa</Radio>
              </RadioGroup>
            </AccordionItem>
          </Accordion>
        </CardBody>
      </Card>



      <Table className="flex m-2 min-w-[100vh] ">
        <TableHeader>
          <TableColumn>Name</TableColumn>
          <TableColumn>{radioDict[radioState]}</TableColumn>
        </TableHeader>
        <TableBody className="" emptyContent={"No Users on Leaderboard"}>{[]}
        </TableBody>
      </Table>
      </div>
  );
}
