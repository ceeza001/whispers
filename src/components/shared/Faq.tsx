import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { faqs } from "@/constants"

const Faq = () => {
  return (
  		<div className="">
        <div className="w-full">
          <h3 className="gradient-text w-full base-semibold">You got questions? we've got answers</h3>
          <h1 className="h2-bold text-white">Here Are The Most Frequently Asked Questions Answered!</h1>

          {faqs.map((faq, index) => (
            <Accordion key={index} type="single" collapsible>
              <AccordionItem value="item-1">
              <AccordionTrigger className="text-left base-semibold text-light-2">
                {faq.title}
              </AccordionTrigger>
                <AccordionContent>
                  <hr className="w-full mb-2 border-light-4" />
                  {faq.content}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>
  )
}

export default Faq