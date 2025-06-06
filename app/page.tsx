
import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import CTA from "@/components/CTA";
import {getAllCompanions, getRecentSessions} from "@/lib/actions/companion.action";
import {getSubjectColor} from "@/lib/utils";

const Page = async () => {
    const companions = await getAllCompanions({ limit: 3});
    const recentSessionsCompanions = await getRecentSessions(10);
  return (
    <main>
      <h1 className="text-2xl underline">Popular Companions</h1>
      <section className="home-section">
          {companions?.map((companion) => (
              <CompanionCard
                  key={companion.id}
                  {...companion}
                  color={getSubjectColor(companion.subject)}
              />
          ))}

      </section>
        <section className="home-section">
            <CompanionsList
            title="Recently completed sessions"
            companions={recentSessionsCompanions}
            classNames="w-2/3 max-lg:w-full"
            />
            <CTA />
        </section>
    </main>
  )
}

export default Page

// <CompanionCard
// id="456"
// name="Countsy the Number Wizard"
// topic="Derivatives & Intergrals"
// subject="Maths"
// duration={30}
// color="#e5d0ff"
//     />
//     <CompanionCard
// id="789"
// name="Verba the Vocabulary Builder"
// topic="language"
// subject="English Literature"
// duration={30}
// color="#BDE7FF"
//     />


// <CompanionCard
// id="123"
// name="Neura the Brainy Explorer"
// topic="Neural Network of the Brain"
// subject="science"
// duration={45}
// color="#ffda6e"
//     />