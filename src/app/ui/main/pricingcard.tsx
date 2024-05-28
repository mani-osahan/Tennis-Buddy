import {Card, CardHeader, CardBody, CardFooter, Image, Button} from "@nextui-org/react";

export default function Pricing({pricingName , price}: any) {

    return(
        <div className="transition-transform duration-300 ease-in-out translater rounded-xl hover:-translate-y-1 duration-300 hover:shadow-xl">

        <Card className="py-6 shadow-xl transition duration-150 ease-out hover:ease-in" 
        >
            <CardHeader className="">
                <h1 className="font-bold text-large">{pricingName}</h1>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
            <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="https://nextui.org/images/hero-card-complete.jpeg"
          width={270}
        />
            </CardBody>

            <Button className="flex flex-box h-12 w-12 justify-center items-center " size="md" color="success" variant="ghost">Get this!</Button>
        </Card>
        </div>
    )
}