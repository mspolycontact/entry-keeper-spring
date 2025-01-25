import React, { useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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

const operators = [
  "ACS DARIUS - GABRIEL",
  "ADAM DANA",
  "ADAM LIVIA",
  "ALBU LUCRETIA",
  "ALBU NELI",
  "BALINT CLAUDIA",
  "Banatan Monica",
  "BANCIU MIOARA",
  "BANU NICOLAE",
  "BANYOI ELISABETA",
  "Barac Elena",
  "BERA ANA",
  "Berghea Nicoleta",
  "BERGHEA TEODORA",
  "BILBOREANU DOINA-MARCELA",
  "BINDEAN MIHAELA",
  "BINDEAN MIHAELA ELISABETA",
  "BIRO GIZELLA",
  "BLESCH GYONGY",
  "BOAR ANCA",
  "BRADEAN MARIA",
  "BRADESCU MIOARA",
  "BRINZEI TUNDE-TIMEA",
  "BUTIU ZINUTA",
  "BUTU VASILE",
  "CAPRA ADRIANA",
  "CASCU LARISA",
  "CEOCALAU ANA",
  "CERCHEZAN IULIANA",
  "CINEZAN ANITA",
  "CINEZAN DANA",
  "CIOBAN DAMIAN",
  "CIOBAN LIOARA",
  "CIOVICA SUSANICA-SIMONA",
  "CIUFUDEAN LENUTA",
  "CLOTAN MARIOARA",
  "COJOCARIU CORINA",
  "Coman Adela",
  "COMAN FLORENTINA",
  "COMAN IOANA",
  "COMANICIU IOANA",
  "COMANICIU MARIA",
  "CORODESCU ELENA",
  "COROESCU DANIELA",
  "COSMA ANA-MARIA",
  "COTOFAN ELENA",
  "COTOFAN LENUTA",
  "COZMA CRISTIAN",
  "CRETU MARIA-ELENA",
  "CRETU VICTORIA",
  "CRIMU ELENA",
  "Cucerzan Vasile",
  "DAJU LUCIA",
  "Damian Adrian",
  "DAMIAN LENUTA",
  "DAN IONIA AURICA",
  "DAN LENUTA",
  "DANCU ANAMARIA",
  "DANCU MADALINA",
  "DANCU RAMONA",
  "DANILA SIMONA",
  "DAVID MARIA",
  "DAVID MARIANA RODICA",
  "DEJAN GHEORGHITA",
  "DICOI ILEANA",
  "DOBRE LUCIA",
  "Doina Mihai",
  "DOMNARIU ELENA",
  "DRAGAN ILEANA",
  "DRAGHITA CAMELIA",
  "DRAGHITA SIMION (165)",
  "DRAGHITA SIMION(160)",
  "FANEA IULIANA",
  "FLESERIU ANCA",
  "FRATICI MARIA",
  "FRATILA MARIA",
  "FRATILA NICOLAE-ILIE",
  "Fratila Viorica",
  "FULEA ANA",
  "GASPAR ALEXANDRU-VASILE",
  "GLIGOR CORINA",
  "GRECU DANA",
  "GRECU LEONTINA",
  "GRECU SANDA",
  "GROZAV ELENA",
  "GUIST LILIANA",
  "HADER NICOLETA FILOFTEIA",
  "HAHN FILOFTEIA",
  "HASA LILIANA",
  "HULPUS VICTORIA",
  "IANCU EUGENIA",
  "IONESCU DIANA",
  "IOSIF ELENA",
  "Irhazi Brigitte",
  "Irimia Carmen",
  "IVAN ELENA",
  "LASCU ILIE",
  "LENGHEA MIHAELA",
  "LIVADA STEFANIA",
  "LOMNASAN MARIA",
  "LOMNASAN SILVIA",
  "LOPRICH SABINE BRIGITTE",
  "LUNGU RODICA",
  "LUPEAN MARIA",
  "LUPEAN TATIANA",
  "LUPEAN VALENTINA",
  "LUPEAN VASILE",
  "Lupu Elena Luiza",
  "MAGHIARI GABRIELA",
  "MAGHIARI RODICA",
  "MAGHIARY AURELIA",
  "MANDREAN ANGELA",
  "MARCU MARIA",
  "MARCU MELANIA",
  "MARCU NICOLAE",
  "MARCU VIOREL",
  "MARIE ADRIANA",
  "MATEI CRISTIANA",
  "MEHRBRODT GUSTAV",
  "MIHALACHE ELENA",
  "MIHALACHE PETRU ELVIS",
  "MINCIUNOIU ROBERT",
  "MISS DANIELA",
  "Mitea Marcela",
  "MIU STELA-IONELA",
  "MOISE MARGARETA",
  "Moldovan Iuliana",
  "MUNTEAN MARIA",
  "MUNTEAN MARIA 359",
  "MUNTEAN ROXANA FLORINA",
  "MUNTEAN VIOREL",
  "Muntenas Doina",
  "MURESAN CLAUDIA",
  "NEAMTU ILEANA",
  "NEAMTU MARIOARA",
  "NEAMTU VALERICA",
  "NEDER GABRIELA-DANIELA",
  "NEFERU ROZALIA",
  "NEGRILA ELENA",
  "NEMES EUGENIA",
  "NEMES LUCIA",
  "NEMES SILVIA",
  "OANCA DELIA",
  "OLAR VICTORITA",
  "OLARU VIRGINIA",
  "OLTEAN GABRIELA ELENA",
  "ONOFREI CORNELIA",
  "ONOFREI ELENA",
  "OSTAS MONICA",
  "OSTAS OLIMPIA AURICA",
  "OSTAS SILVIU IOAN",
  "PASCALAU ALEXANDRA",
  "PASCU EMILIA",
  "PASCU KARINA",
  "PETCU MARIA",
  "PETRU AURICA",
  "PETRU VALERICA",
  "POP GEORGIANA",
  "POPA CRISTINELA",
  "POPA EMILIA",
  "Popa Floare",
  "POPA RAMONA",
  "PRECUP RODICA",
  "PRESECAN MARIOARA",
  "PRODEA ANA",
  "PRODEA EUGENIA",
  "PRODEA GINA",
  "PRODEA LIVIU",
  "PRODEA MARIA ADRIANA",
  "PUIA LUCRETIA ALINA",
  "PUIA TEODOR",
  "PURCAR EUGENIA",
  "PUSCA ANDREEA",
  "RADU CORINA MELANIA",
  "RAHAIAN LAURA MARIA",
  "RAU ANISOARA",
  "Rau Vasile Dan",
  "ROTARU CARMEN",
  "SABAU SEBASTIAN NICOLAE",
  "SCHIAU OVIDIU",
  "SEBU EMILIA",
  "SECASAN DANIELA",
  "Selistean Mariana",
  "SEMEREAN MIHAELA",
  "SERBAN LEONTINA MARIANA",
  "SERBAN LUCIA ILEANA",
  "SERBAN VERONICA",
  "SERBANECI IOAN",
  "Simtion Livia",
  "SIONEANU ELENA",
  "SIPOS COSMINA",
  "SIPOS NICOLETA",
  "SOAITA ANA",
  "SOIMA MIRELA",
  "SOITA LUCICA",
  "SOLOMON CORINA",
  "Stanca Mirona",
  "Stanciu Cornelia",
  "STOIA ILIE",
  "STOIA OANA",
  "SUCIU IOAN",
  "SUSANU LILIANA",
  "TIPLEA MARIA",
  "TOLAN SOFICA",
  "TOMUTA ANA",
  "TOMUTA DOINA MARIOARA",
  "TOMUTA MELISSA",
  "TOMUTA SILVESTRU",
  "TOPARCEAN MARIA",
  "TOPIRCEAN ANA ELENA",
  "TOPIRCEAN MARIANA",
  "TOPIRCEAN MINERVA",
  "Toth HAJNALKA",
  "TROANCA ILIE",
  "Tucaliuc Elena",
  "TUDOR DRAGOS-SERBAN",
  "TULI IRINA RODICA",
  "TURCU IOAN VIOREL",
  "ULICI ILIE",
  "UNGUREAN ANDREEA MIHAELA",
  "VARGA ELISABETA",
  "VARGA LACRAMIOARA-CRISTINA",
  "VINTILA NICOLAE",
  "VIRLAN MIHAELA",
  "VOICU DANIELA",
  "VOINA RAFILA",
  "VOINEA PARASCHIVA",
  "FLICHIS ALINA"
];

const DataEntryForm = () => {
  const { toast } = useToast();
  const { register, handleSubmit, reset, watch, setValue } = useForm<FormData>();
  const [percentage, setPercentage] = useState<string>("0.00");

  const calculatePercentage = (target: string, hours: string, pieces: string) => {
    if (!target || !hours || !pieces) return;
    
    const targetNum = parseFloat(target);
    const hoursNum = parseFloat(hours);
    const piecesNum = parseFloat(pieces);
    
    if (hoursNum === 0 || targetNum === 0) return;
    
    const expectedPieces = (targetNum / 8) * hoursNum;
    const calculatedPercentage = (piecesNum / expectedPieces) * 100;
    
    setPercentage(calculatedPercentage.toFixed(2));
  };

  const validateHours = async (hours: string, date: string, operatorName: string) => {
    // In a real application, this would check against a database
    // For now, we'll just validate that hours <= 8
    const hoursNum = parseFloat(hours);
    return hoursNum <= 8;
  };

  const onSubmit = async (data: FormData) => {
    const isHoursValid = await validateHours(data.workedHours, data.date, data.operatorName);
    
    if (!isHoursValid) {
      toast({
        title: "Error",
        description: "Maximum 8 hours per day allowed",
        variant: "destructive",
      });
      return;
    }

    if (confirm("Do you want to transfer the data?")) {
      console.log(data);
      toast({
        title: "Success",
        description: "Data has been saved successfully",
      });
    }
  };

  const handleReset = () => {
    if (confirm("Do you want to reset the form?")) {
      reset();
      setPercentage("0.00");
      toast({
        title: "Form Reset",
        description: "All fields have been cleared",
      });
    }
  };

  // Watch form values for percentage calculation
  const target = watch("target");
  const hours = watch("workedHours");
  const pieces = watch("producedPieces");

  // Update percentage when values change
  React.useEffect(() => {
    calculatePercentage(target, hours, pieces);
  }, [target, hours, pieces]);

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center bg-blue-600 text-white py-3 mb-6 rounded-t-lg -mt-6 -mx-6">
        Eficienta Productie
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="operatorName">Nume Operator</Label>
          <Select onValueChange={(value) => setValue("operatorName", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select operator" />
            </SelectTrigger>
            <SelectContent className="max-h-[200px] overflow-y-auto">
              {operators.map((operator) => (
                <SelectItem key={operator} value={operator}>
                  {operator}
                </SelectItem>
              ))}
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
          <RadioGroup defaultValue="A" className="flex space-x-4" onValueChange={(value) => setValue("shift", value as "A" | "B" | "C")}>
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
          <Select onValueChange={(value) => setValue("device", value)}>
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
          <Input {...register("workedHours")} type="number" max="8" step="0.5" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="producedPieces">Numar piese produse</Label>
          <Input {...register("producedPieces")} type="number" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="percentage">Procent realizat</Label>
          <Input value={`${percentage}%`} readOnly />
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