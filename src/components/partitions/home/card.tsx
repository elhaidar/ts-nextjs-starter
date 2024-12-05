import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  title: string;
  data: any;
};

export default function CustomCard({ title, data }: Props) {
  return (
    <Card className="w-[36rem] bg-slate-800 pr-4">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}
