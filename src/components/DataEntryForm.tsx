import { useState } from "react";
import { useForm } from "react-hook-form";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  operatorName: string;
  date: string;
  shift: "A" | "B" | "C";
  device: string;
  line: string;
  target: string;
  workedHours: string;
  producedPieces: string;
  observations: string;
}

const DataEntryForm = () => {
  const { toast } = useToast();
  const { register, handleSubmit, reset } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
    toast({
      title: "Success",
      description: "Data has been saved successfully",
    });
  };

  const handleReset = () => {
    reset();
    toast({
      title: "Form Reset",
      description: "All fields have been cleared",
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center bg-blue-600 text-white py-3 mb-6 rounded-t-lg -mt-6 -mx-6">
        Eficienta Productie
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="operatorName">Nume Operator</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select operator" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="operator1">Operator 1</SelectItem>
              <SelectItem value="operator2">Operator 2</SelectItem>
              <SelectItem value="operator3">Operator 3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Data</Label>
          <div className="relative">
            <Input
              type="date"
              {...register("date")}
              className="pl-10"
            />
            <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Schimb</Label>
          <RadioGroup defaultValue="A" className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="A" id="A" />
              <Label htmlFor="A">A</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="B" id="B" />
              <Label htmlFor="B">B</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="C" id="C" />
              <Label htmlFor="C">C</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="device">Dispozitiv</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select device" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="device1">Device 1</SelectItem>
              <SelectItem value="device2">Device 2</SelectItem>
              <SelectItem value="device3">Device 3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="line">Linie</Label>
          <Input {...register("line")} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="target">Target</Label>
          <Input {...register("target")} type="number" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="workedHours">Ore lucrate</Label>
          <Input {...register("workedHours")} type="number" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="producedPieces">Numar piese produse</Label>
          <Input {...register("producedPieces")} type="number" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="observations">Observatii</Label>
          <Input {...register("observations")} />
        </div>

        <div className="flex justify-center space-x-4 pt-4">
          <Button type="submit" className="bg-green-500 hover:bg-green-600">
            Incarcare
          </Button>
          <Button
            type="button"
            onClick={handleReset}
            variant="destructive"
          >
            Resetare
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DataEntryForm;