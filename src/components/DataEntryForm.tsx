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
import { supabase } from "@/lib/supabase";

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

interface DeviceData {
  id: string;
  line: string;
  target: number;
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

const devices: DeviceData[] = [
  { id: "D 154/0100/0180", line: "K12-rlc - Asamblare", target: 1900 },
  { id: "I 161/0440/0020", line: "Ak-nc2 Asamblare", target: 4600 },
  { id: "I 161/0440/0030", line: "Ak-nc2 Asamblare", target: 4600 },
  { id: "I 161/0440/0035", line: "Ak-nc2 Asamblare", target: 4600 },
  { id: "I 161/0440/0045", line: "Ak-nc2 Asamblare", target: 4600 },
  { id: "I 161/0440/0055", line: "Ak-nc2 Asamblare", target: 4600 },
  { id: "I 161/0440/0060", line: "Ak-nc2 Asamblare", target: 4600 },
  { id: "I 161/0440/0065", line: "Ak-nc2 Asamblare", target: 4600 },
  { id: "I 161/0440/0075", line: "Ak-nc2 Asamblare", target: 4600 },
  { id: "I 161/0440/0115", line: "Ak-nc2 Asamblare", target: 4600 },
  { id: "I 161/0440/0125", line: "Ak-nc2 Asamblare", target: 4600 },
  { id: "I 161/0440/0135", line: "Ak-nc2 Asamblare", target: 4600 },
  { id: "I 161/0440/0145", line: "Ak-nc2 Asamblare", target: 4600 },
  { id: "I 161/0440/0155", line: "Ak-nc2 Asamblare", target: 4600 },
  { id: "I 161/0440/0170", line: "Ak-nc2 Asamblare", target: 4600 },
  { id: "I 161/0440/0180", line: "Ak-nc2 Asamblare", target: 4600 },
  { id: "I 161/0440/0190", line: "Ak-nc2 Asamblare", target: 4600 },
  { id: "I 161/0440/0200", line: "Ak-nc2 Asamblare", target: 4600 },
  { id: "I 161/0440/0225", line: "Ak-nc2 Asamblare", target: 4600 },
  { id: "I 161/0440/0237", line: "Ak-nc2 Asamblare", target: 4600 },
  { id: "I 161/0440/0250", line: "Ak-nc2 Asamblare", target: 4600 },
  { id: "I 161/0440/0270", line: "Ak-nc2 Asamblare", target: 4600 },
  { id: "I 161/0440/0275", line: "Ak-nc2 Asamblare", target: 4600 },
  { id: "I 161/0440/0280", line: "Ak-nc2 Asamblare", target: 4600 },
  { id: "I 161/0440/0290", line: "Ak-nc2 Asamblare", target: 4600 },
  { id: "I 161/0440/0330", line: "Ak-nc2 Asamblare", target: 4600 },
  { id: "I 161/0440/0340", line: "Ak-nc2 Asamblare", target: 4600 },
  { id: "I 161/0440/0350", line: "Ak-nc2 Asamblare", target: 4600 },
  { id: "I 161/0440/0360", line: "Ak-nc2 Asamblare", target: 4600 },
  { id: "I 161/0440/0370", line: "Ak-nc2 Asamblare", target: 4600 },
  { id: "I 161/0440/0380", line: "Ak-nc2 Asamblare", target: 4600 },
  { id: "I 161/0440/0410", line: "Ak-nc2 Asamblare", target: 4600 },
  { id: "I 161/0440/0415", line: "Ak-nc2 Asamblare", target: 4600 },
  { id: "I 161/0440/0420", line: "Ak-nc2 Asamblare", target: 4600 },
  { id: "I 161/0440/0435", line: "Ak-nc2 Asamblare", target: 4600 },
  { id: "I 161/0440/0445", line: "Ak-nc2 Asamblare", target: 4600 },
  { id: "I 161/0440/0450", line: "Ak-nc2 Asamblare", target: 4600 },
  { id: "I 161/0440/0457", line: "Ak-nc2 Asamblare", target: 4600 },
  { id: "I 161/0440/0460", line: "Ak-nc2 Asamblare", target: 4600 },
  { id: "I 161/0440/0470", line: "Ak-nc2 Asamblare", target: 4600 },
  { id: "I 161/0440/0490", line: "Ak-nc2 Asamblare", target: 4600 },
  { id: "I 161/0440/0500", line: "Ak-nc2 Asamblare", target: 4600 },
  { id: "I 161/0440/0510", line: "Ak-nc2 Asamblare", target: 4600 },
  { id: "I 161/0440/0520", line: "Ak-nc2 Asamblare", target: 4600 },
  { id: "I 161/0440/0527", line: "Ak-nc2 Asamblare", target: 4600 },
  { id: "I 161/0440/0530", line: "Ak-nc2 Asamblare", target: 4600 },
  { id: "I 161/0440/0540", line: "Ak-nc2 Asamblare", target: 4600 },
  { id: "I 161/0440/0560", line: "Ak-nc2 Asamblare", target: 4600 },
  { id: "I 161/0440/0590", line: "Ak-nc2 Asamblare", target: 4600 },
  { id: "I 161/0440/0595", line: "Ak-nc2 Asamblare", target: 4600 },
  { id: "I 161/0440/0600", line: "Ak-nc2 Asamblare", target: 4600 },
  { id: "I 161/0440/0605", line: "Ak-nc2 Asamblare", target: 4600 },
  { id: "I 161/0440/0285", line: "Ak-nc2 Asamblare", target: 4600 },
  { id: "I 161/0440/0175", line: "Ak-nc2 Asamblare", target: 4600 },
  { id: "I 161/0440/0185", line: "Ak-nc2 Asamblare", target: 4600 },
  { id: "I 161/0440/0195", line: "Ak-nc2 Asamblare", target: 4600 },
  { id: "I 161/0440/0205", line: "Ak-nc2 Asamblare", target: 4600 },
  { id: "I 161/0440/0215", line: "Ak-nc2 Asamblare", target: 4600 },
  { id: "I 161/0440/0245", line: "Ak-nc2 Asamblare", target: 4600 },
  { id: "I 161/0440/0255", line: "Ak-nc2 Asamblare", target: 4600 },
  { id: "I 161/0440/0265", line: "Ak-nc2 Asamblare", target: 4600 },
  { id: "I 967/1300/0210", line: "Ak-nc2 Asamblare", target: 4000 },
  { id: "I 161/0440/0167", line: "Ak-nc2 Asamblare", target: 5000 },
  { id: "I 161/0440/0097", line: "Ak-nc2 Asamblare", target: 4400 },
  { id: "I 161/0440/0222", line: "Ak-nc2 Asamblare", target: 5000 },
  { id: "I 161/0440/0236", line: "Ak-nc2 Asamblare", target: 5000 },
  { id: "I 161/0440/0427", line: "Ak-nc2 Asamblare", target: 5000 },
  { id: "I 161/0440/0456", line: "Ak-nc2 Asamblare", target: 5000 },
  { id: "I 161/0440/0526", line: "Ak-nc2 Asamblare", target: 5000 },
  { id: "I 161/0440/0327", line: "Ak-nc2 Asamblare", target: 5000 },
  { id: "I 161/0440/0337", line: "Ak-nc2 Asamblare", target: 5000 },
  { id: "I 161/0440/0297", line: "Ak-nc2 Asamblare", target: 5000 },
  { id: "I 161/0440/0307", line: "Ak-nc2 Asamblare", target: 5000 },
  { id: "I 161/0440/0317", line: "Ak-nc2 Asamblare", target: 5000 },
  { id: "I 161/0440/0105", line: "Ak-nc2 Asamblare", target: 4000 },
  { id: "I 161/0440/0475", line: "Ak-nc2 Asamblare", target: 5000 },
  { id: "I 161/0440/0375", line: "Ak-nc2 Asamblare", target: 5000 },
  { id: "I 161/0440/0395", line: "Ak-nc2 Asamblare", target: 5000 },
  { id: "I 161/0440/0405", line: "Ak-nc2 Asamblare", target: 5000 },
  { id: "I 161/0440/0465", line: "Ak-nc2 Asamblare", target: 5000 },
  { id: "I 161/0440/0515", line: "Ak-nc2 Asamblare", target: 5000 },
  { id: "I 161/0440/0161", line: "Ak-nc2 Asamblare", target: 5000 },
  { id: "I 161/0440/0040", line: "Ak-nc2 Asamblare", target: 5000 },
  { id: "I 161/0440/0150", line: "Ak-nc2 Asamblare", target: 5000 },
  { id: "I 161/0440/0051", line: "Ak-nc2 Asamblare", target: 5000 },
  { id: "I 161/0440/0240", line: "Ak-nc2 Asamblare", target: 4400 },
  { id: "I 161/0440/0085", line: "Ak-nc2 Asamblare", target: 4400 },
  { id: "I 161/0440/0385", line: "Ak-nc2 Asamblare", target: 4400 },
  { id: "I 161/0440/0232", line: "Ak-nc2 Asamblare", target: 4400 },
  { id: "I 161/0440/0552", line: "Ak-nc2 Asamblare", target: 4400 },
  { id: "I 161/0440/0347", line: "Ak-nc2 Asamblare", target: 4400 },
  { id: "I 161/0440/0357", line: "Ak-nc2 Asamblare", target: 4400 },
  { id: "I 161/0440/0365", line: "Ak-nc2 Asamblare", target: 4400 },
];

const DataEntryForm = () => {
  const { toast } = useToast();
  const { register, handleSubmit, reset, watch, setValue } = useForm<FormData>();
  const [percentage, setPercentage] = useState<string>("0.00");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    const hoursNum = parseFloat(hours);
    return hoursNum <= 8;
  };

  const handleDeviceChange = (deviceId: string) => {
    const selectedDevice = devices.find(d => d.id === deviceId);
    if (selectedDevice) {
      setValue("device", deviceId);
      setValue("line", selectedDevice.line);
      setValue("target", selectedDevice.target.toString());
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
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
        const { error } = await supabase
          .from('production_entries')
          .insert([
            {
              operator_name: data.operatorName,
              date: data.date,
              shift: data.shift,
              device: data.device,
              line: data.line,
              target: parseInt(data.target),
              worked_hours: parseFloat(data.workedHours),
              produced_pieces: parseInt(data.producedPieces),
              observations: data.observations,
              efficiency_percentage: parseFloat(percentage)
            }
          ]);

        if (error) {
          console.error('Supabase error:', error);
          throw error;
        }

        toast({
          title: "Success",
          description: "Data has been saved successfully",
        });
        reset();
        setPercentage("0.00");
      }
    } catch (error) {
      console.error('Error saving data:', error);
      toast({
        title: "Error",
        description: "Failed to save data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
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

  const target = watch("target");
  const hours = watch("workedHours");
  const pieces = watch("producedPieces");

  React.useEffect(() => {
    calculatePercentage(target, hours, pieces);
  }, [target, hours, pieces]);

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg border border-gray-200">
      <h1 className="text-2xl font-bold text-center bg-blue-600 text-white py-3 rounded-t-lg">
        Eficienta Productie
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="operatorName" className="text-gray-700 font-medium">Nume Operator</Label>
          <Select onValueChange={(value) => setValue("operatorName", value)}>
            <SelectTrigger className="w-full bg-white border-gray-300">
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
          <Label htmlFor="date" className="text-gray-700 font-medium">Data</Label>
          <div className="relative">
            <Input
              type="date"
              {...register("date")}
              className="pl-10 w-full bg-white border-gray-300"
            />
            <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-gray-700 font-medium">Schimb</Label>
          <RadioGroup defaultValue="A" className="flex space-x-4" onValueChange={(value) => setValue("shift", value as "A" | "B" | "C")}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="A" id="A" />
              <Label htmlFor="A" className="text-gray-700">A</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="B" id="B" />
              <Label htmlFor="B" className="text-gray-700">B</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="C" id="C" />
              <Label htmlFor="C" className="text-gray-700">C</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="device" className="text-gray-700 font-medium">Dispozitiv</Label>
          <Select onValueChange={handleDeviceChange}>
            <SelectTrigger className="w-full bg-white border-gray-300">
              <SelectValue placeholder="Select device" />
            </SelectTrigger>
            <SelectContent className="max-h-[200px] overflow-y-auto">
              {devices.map((device) => (
                <SelectItem key={device.id} value={device.id}>
                  {device.id}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="line" className="text-gray-700 font-medium">Linie</Label>
          <Input {...register("line")} readOnly className="w-full bg-gray-50 border-gray-300" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="target" className="text-gray-700 font-medium">Target</Label>
          <Input {...register("target")} readOnly className="w-full bg-gray-50 border-gray-300" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="workedHours" className="text-gray-700 font-medium">Ore lucrate</Label>
          <Input {...register("workedHours")} type="number" max="8" step="0.5" className="w-full bg-white border-gray-300" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="producedPieces" className="text-gray-700 font-medium">Numar piese produse</Label>
          <Input {...register("producedPieces")} type="number" className="w-full bg-white border-gray-300" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="percentage" className="text-gray-700 font-medium">Procent realizat</Label>
          <Input value={`${percentage}%`} readOnly className="w-full bg-gray-50 border-gray-300" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="observations" className="text-gray-700 font-medium">Observatii</Label>
          <Input {...register("observations")} className="w-full bg-white border-gray-300" />
        </div>
        
        <div className="flex justify-center space-x-4 pt-4">
          <Button 
            type="submit" 
            className="bg-green-600 hover:bg-green-700 text-white px-6"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Incarcare"}
          </Button>
          <Button
            type="button"
            onClick={handleReset}
            variant="destructive"
            className="px-6"
            disabled={isSubmitting}
          >
            Resetare
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DataEntryForm;