
import { Link, Route } from 'react-router-dom';

const TermsAndConditions = () => {
    return (
        <div>



            <div className="container g-py-150 g-font-size-18 g-line-height-1_6 g-color-black">
                <h1 className="g-mb-25">Terms and Conditions</h1>
                <p>
                    Thanks for using our Services. The Services are provided by E-Tutor. (referred to herein as "Provider"). You, the user of the Services, will be referred to herein as the "Customer".
                </p>
                <p>
                    By using the Services, you are agreeing to these terms and conditions and to be bound by them. Please read them carefully. E-Tutor's Services are diverse, so sometimes additional terms or product requirements (including age requirements) may apply. Additional terms will be available with the relevant Services, and those additional terms become part of your agreement with E-Tutor if you use those Services.
                </p>
                <h4>1. <u>Definitions</u></h4>
                <ul className="terms">
                    <li>
                        "Access Credentials" means any user name, identification number, password, email, security token or other security code, medthod, technology or decide used, alone or in combination, to verify an individual's identity and authorization to access aand use the Services.
                    </li>
                    <li>
                        "Aggregated Statistics" means data and information related to Customer's use of the Services that is used by Provider in an aggregate and anonymized manner, including to compile statistical and performance information related to the provision and operation of the Services.
                    </li>
                    <li>
                        "Authorized User" means Customer's employees, consultants, contrators, agents and customers or clients (i) who are authorized by Customer to access and use the Services under the rights granted to Customer pursuant to this Agreement; and (ii) for whom access to the Services has been purchased hereunder.
                    </li>
                    <li>
                        "Confidential Information" has the meaning set forth in Section 6.
                    </li>
                    <li>
                        "Customer Data" means, other than Aggregated Statistics, information, data, and other content, in any form or medium, that is submitted, posted, or otherwise transmitted by or on behalf of Customer or an Authorized User through the Services.
                    </li>
                    <li>
                        "Customer Systems" means Customer's information technology infrastructure, including computers, software, hardware, databases, electronic systems (including database management systems), networks and Internet connectivity, whether operated directly by Customer or through the user of third-party services.
                    </li>
                    <li>
                        "Documentation" means Provider's user manuals, handbooks, and guides relating to the Services, provided by Provider to Customer either electronically or in hard copy form/end user documentation relating to the Services.
                    </li>
                    <li>
                        "Feedback" has the meaning set forth in Section 7(c).
                    </li>
                    <li>
                        "Fees" has the meaning set forth in Section 5(a).
                    </li>
                    <li>
                        "Law" means any statute, law, ordinance, regulation, rule, code, order, constitution, treaty, common law, judgment, decree or other requirement of any federal, provincial, territorial, municipal or foreign government or political subdivision thereof, or any arbitrator, court or tribunal of competent jurisdiction.
                    </li>
                    <li>
                        "Initial Term" has the meaning set forth in section 11(a).
                    </li>
                    <li>
                        "Losses" has the meaning set forth in Section 9(a)(i).
                    </li>
                    <li>
                        "Notice" has the meaning set forth in Section 13(c).
                    </li>
                    <li>
                        "Provider IP" means the Services, the Documentation, and all registered and unregistered rights granted, applied for, or otherwise now or hereafter in existence under or related to any patent, copyright, trademark, trade secret, database protection, or other intellectual property provided to Customer or any Authorized User in connection with the foregoing. For the avoidance of doubt, Provider IP includes Aggregated Statistics and any information, data, or other content derived from Provider's monitoring of Customer's access to or use of the Services, but does not include Customer Data.
                    </li>
                    <li>
                        "Provider Materials" means the Services, specifications, Documentation and Provider Systems and any and all other information, data, documents, materials, works and other content, devices, methods, processes, hardware, software and other technologies and inventions, including any deliverables, technical or functional descriptions, requirements, plans or reports, that are provided or used by Provider or any Subcontrator in connection with the Services or otherwise comprise or relate to the Services or Provider Systems. For the avoidance of doubt, Provider Materials include any information, data or other content derived from Provider's monitoring of Customer's access to or use of the Services, but do not include Customer Data.
                    </li>
                    <li>
                        "Provider Systems" means the information technology infrastructure used by or on behalf of Provider in performing the Services, including all computers, software, hardware, databases, electronic systems (including database management systems) and networks, whether operated directly by Provider or through the use of third-party services.
                    </li>
                    <li>
                        "Renewal Term" has the meaning set forth in Section 11(a).
                    </li>
                    <li>
                        "Service Suspension" has the meaning set forth in Section 2(f).
                    </li>
                    <li>
                        "Services" means the software-as-a-service offerings offered by E-Tutor and purchased by Customer
                    </li>
                    <li>
                        "E-Tutor Account" means the Customer's individual user account, as provided to it by Provider.
                    </li>
                    <li>
                        "Term" has the meaning set forth in Section 11(a).
                    </li>
                    <li>
                        "Third-Party Claim" has the meaning set forth in Section 9(a)(i).
                    </li>
                    <li>
                        "Third-Party Products" means any third-party products provided with or incorportated into the Services.
                    </li>
                </ul>
                <h4>2. <u>Access and Use.</u></h4>
                <ul className="terms">
                    <li>
                        (a) <u>Provision of Access.</u> Subject to and conditioned on Customer's payment of Fees and compliance with all other terms and conditions of this agreement, Provider hereby grants Customer a non-exclusive, non-transferable (except in compliance with Section 13(j)) right to access and use the Services during the Term, solely for use by Authorized Users in accordance with the terms and conditions herein. Such use is limited to Customer's internal use. Provider shall provide to Customer the necessary passwords and network links or connections to allow Customer to access the Services. The total number of Authorized Users will not exceed the number set forth in the plan purchased by Customer, except as expressly agreed to in writing by the Parties and subject to any appropriate adjustment of the Fees payable hereunder.
                    </li>
                    <li>
                        (b) <u>Implementation</u>. Provider offers an onboarding session for all Customers at no additional cost (the “Onboarding Session”). In the Onboarding Session, a Provider account manager will provide administrative training and assist Customer with initial setup. Customer is permitted up to three (3) Onboarding Sessions at no additional cost.
                    </li>
                    <li>
                        (c) <u>Documentation License</u>. Subject to the terms and conditions contained in this Agreement, Provider hereby grants to Customer a non-exclusive, non-sublicenseable, non-transferable (except in compliance with Section 13(j)) license to use the Documentation during the Term solely for Customer’s internal business purposes in connection with its use of the Services.
                    </li>
                    <li>
                        (d) <u>Use Restrictions</u>. Customer shall not use the Services for any purposes beyond the scope of the access granted in this Agreement. Customer shall not at any time, directly or indirectly, and shall not permit any Authorized Users to: (i) copy, modify, or create derivative works of the Services or Documentation, in whole or in part; (ii) rent, lease, lend, sell, license, sublicense, assign, distribute, publish, transfer, or otherwise make available the Services or Documentation; (iii) reverse engineer, disassemble, decompile, decode, adapt, or otherwise attempt to derive or gain access to any software component of the Services, in whole or in part; (iv) remove any proprietary notices from the Services or Documentation; or (v) use the Services or Documentation in any manner or for any purpose that infringes, misappropriates, or otherwise violates any intellectual property right or other right of any person, or that violates any applicable law.
                    </li>
                    <li>
                        (e) <u>Reservation of Rights</u>. Provider reserves all rights not expressly granted to Customer in this Agreement. Except for the limited rights and licenses expressly granted under this Agreement, nothing in this Agreement grants, by implication, waiver, estoppel, or otherwise, to Customer or any third party any intellectual property rights or other right, title, or interest in or to the Provider IP.
                    </li>
                    <li>
                        (f) <u>Suspension</u>. Notwithstanding anything to the contrary in this Agreement, Provider may temporarily suspend Customer’s and any Authorized User’s access to any portion or all of the Services if: (i) Provider reasonably determines that (A) there is a threat or attack on any of the Provider IP, (B) Customer’s or any Authorized User’s use of the Provider IP disrupts or poses a security risk to the Provider IP or to any other customer or vendor of Provider, (C) Customer, or any Authorized User, is using the Provider IP for fraudulent or illegal activities, (D) subject to applicable Law, Customer has ceased to continue its business in the ordinary course, made an assignment for the benefit of creditors or similar disposition of its assets, or become the subject of any bankruptcy, reorganization, liquidation, dissolution, or similar proceeding, (E) Provider’s provision of the Services to Customer or any Authorized User is prohibited by applicable law, or (F) technical repairs or maintenance are required to the Provider Systems; (ii) any vendor of Provider has suspended or terminated Provider’s access to or use of any third-party services or products required to enable Customer to access the Services; or (iii) in accordance with Section 5(a) (any such suspension described in sub-clause (i), (ii), or (iii), a “Service Suspension”). Provider shall use commercially reasonable efforts to provide written notice of any Service Suspension to Customer and to provide updates regarding resumption of access to the Services following any Service Suspension. Provider shall use commercially reasonable efforts to resume providing access to the Services as soon as reasonably possible after the event giving rise to the Service Suspension is cured. Provider will have no liability for any damage, liabilities, losses (including any loss of data or profits), or any other consequences that Customer or any Authorized User may incur as a result of a Service Suspension.
                    </li>
                    <li>
                        (g) <u>Changes</u>. Provider reserves the right, in its sole discretion, to make any changes to the Services and Provider Materials that it deems necessary or useful to: (a) maintain or enhance: (i) the quality or delivery of Provider’s services to its customers; (ii) the competitive strength of or market for Provider’s services; or (iii) the cost efficiency or performance of the Services; or (b) to comply with applicable Law.
                    </li>
                    <li>
                        (h) <u>Subcontractors</u>. Provider may, from time to time, in its discretion engage third parties to perform Services (each, a “Subcontractor”).
                    </li>
                    <li>
                        (i) <u>Aggregated Statistics</u>. Notwithstanding anything to the contrary in this Agreement, Provider may monitor Customer’s use of the Services and collect and compile Aggregated Statistics. As between Provider and Customer, all right, title, and interest in Aggregated Statistics, and all intellectual property rights therein, belong to and are retained solely by Provider. Customer acknowledges that Provider may compile Aggregated Statistics based on Customer Data input into the Services. Customer agrees that Provider may (i) make Aggregated Statistics publicly available in compliance with applicable Law, and (ii) use Aggregated Statistics to the extent and in the manner permitted under applicable Law; provided that such Aggregated Statistics do not identify Customer or Customer’s Confidential Information.
                    </li>
                    <li>
                        (j) <u>Suspension or Termination of Services</u>. Provider may, directly or indirectly, and by use of a Provider disabling device or any other lawful means, suspend, terminate or otherwise deny access to, or use of, all or any part of the Services or Provider Materials by Customer, any Authorized User or any other Person, without incurring any resulting obligation or liability, if: (a) Provider receives a Governmental Order that expressly or by reasonable implication requires Provider to do so; or (b) Provider believes, in its sole discretion, that: (i) Customer or any Authorized User has failed to comply with, any term of this Agreement, accessed or used the Services beyond the scope of the rights granted or for a purpose not authorized under this Agreement or in any manner that does not comply with any instruction or requirement of the Specifications; (ii) Customer or any Authorized User is, has been, or is likely to be involved in any fraudulent, misleading or unlawful activities; or (iii) this Agreement expires or is terminated. This Section 2(j) does not limit any of Provider’s other rights or remedies, whether at Law, in equity or under this Agreement.
                    </li>
                </ul>
                <h4>3. <u>Customer Responsibilities.</u></h4>
                <ul className="terms">
                    <li>
                        (a)	<u>General</u>. Customer is responsible and liable for all uses of the Services and Documentation resulting from access provided by Customer, directly or indirectly, whether such access or use is permitted by or in violation of this Agreement. Without limiting the generality of the foregoing, Customer is responsible for all acts and omissions of Authorized Users, and any act or omission by an Authorized User that would constitute a breach of this Agreement if taken by Customer will be deemed a breach of this Agreement by Customer. Customer shall use all reasonable efforts to make all Authorized Users aware of this Agreement’s provisions as applicable to such Authorized User’s use of the Services, and shall cause Authorized Users to comply with such provisions.
                    </li>
                    <li>
                        (b)	<u>Specific Customer Obligations</u>: Customer further guarantees, acknowledges and agrees that:
                        <ul className="terms">
                            <li>
                                (i)	it will keep private and secure all access credentials and passwords provided to it;
                            </li>
                            <li>
                                (ii)	it will set up, maintain and operate in good repair and in accordance with the Documentation all Customer Systems on or through which the Services are accessed or used;
                            </li>
                            <li>
                                (iii)	it will provide Provider personnel with such access to Customer’s premises and Customer Systems as is necessary for Provider to perform the Services in accordance with the terms of this Agreement;
                            </li>
                            <li>
                                (iv)	it will assume full responsibility for all Customer Data, content and information it posts, uploads or otherwise provides to the Provider Systems;
                            </li>
                            <li>
                                (v)	it will not upload any Customer Data, content or materials that are potentially fraudulent, deceitful, defamatory, obscene, violent, hateful, racially discriminatory, illegal or offensive and further agrees that any content uploaded by Customer is in their sole discretion and that Provider is not responsible for such content and cannot be held liable for same;
                            </li>
                            <li>
                                (vi)	any content uploaded or actions performed through Customer’s E-Tutor Account are done so at the Customer’s own risk;
                            </li>
                            <li>
                                (vii)	all correspondences and dealings with users of their E-Tutor Account or website are their sole responsibility;
                            </li>
                            <li>
                                (viii)	it has express permission to use all content and images on their E-Tutor Account;
                            </li>
                            <li>
                                (ix)	it has received consent from their end-users before adding them into their E-Tutor Account; and
                            </li>
                            <li>
                                (x)	it will provide all cooperation and assistance as Provider may reasonably request to enable Provider to exercise its rights and perform its obligations under and in connection with this Agreement.
                            </li>
                        </ul>
                    </li>
                    <li>
                        (c)	Effect of Customer Failure or Delay. Provider is not responsible or liable for any delay or failure of performance caused in whole or in part by Customer’s delay in performing, or failure to perform, any of its obligations under this Agreement (each, a “Customer Failure”).
                    </li>
                    <li>
                        (d)	Third-Party Products. Provider may from time to time make Third-Party Products available to Customer. For purposes of this Agreement, such Third-Party Products are subject to their own terms and conditions. It is Customer’s sole responsibility to read and understand such terms and conditions. Provider neither owns nor operates such Third-Party Products, has no control of them, and makes no representations or warranties with respect to them. If Customer cannot or will not abide by the terms and conditions of such Third-Party Products, they may be precluded from using the Services.
                    </li>
                </ul>
                <h4>4. <u>Service Levels; Support; Data Backup</u>. Subject to the terms and conditions of this Agreement:</h4>
                <ul className="terms">
                    <li>
                        (a)	Provider will use commercially reasonable efforts to make the Services available at least 99.9% of the time as measured over the course of each calendar quarter during the Term (each such calendar quarter, a <strong>“Service Period”</strong>), excluding unavailability as a result of any of the Exceptions described below in this Section 4 (the <strong>“Availability Requirement”</strong>).
                    </li>
                    <li>
                        (b)	For purposes of calculating the Availability Requirement, the following are “Exceptions” to the Availability Requirement, and neither the Hosted Services will be considered un-Available nor any Service Level Failure be deemed to occur in connection with any failure to meet the Availability Requirement or impaired ability of Customer or its Authorized Users to access or use the Services that is due, in whole or in part, to any:
                        <ul className="terms">
                            <li>
                                i.	act or omission by Customer or any Authorized User/access to or use of the Services by Customer or any Authorized User, or using Customer’s or an Authorized User’s Access Credentials, that does not strictly comply with this Agreement and the Services;
                            </li>
                            <li>
                                ii.	delay or failure of performance caused in whole or in part by Customer’s delay in performing, or failure to perform, any of its obligations under this Agreement;
                            </li>
                            <li>
                                iii.	Internet connectivity of Customer or its Authorized User;
                            </li>
                            <li>
                                iv.	Force Majeure Event;
                            </li>
                            <li>
                                v.	failure, interruption, outage or other problem with any software, hardware, system, network, facility or other matter not supplied by Provider under this Agreement;
                            </li>
                            <li>
                                vi.	scheduled downtime; or
                            </li>
                            <li>
                                vii.	disabling, suspension or termination of the Services under Section 2(j).
                            </li>
                        </ul>
                    </li>
                    <li>
                        (c)	<u>Support</u>. Technical support is provided for Customers if the support request is directly and solely regarding the Services so long as the request is made on a weekday (Monday through Friday) between 10:00 and 18:00 Eastern Standard Time (excluding Canadian Holidays). Within such hours, Provider can provide a guarantee of a response time within one (1) business day of the request being received by Provider. In the unlikely event where a server issue causes any downtime, the matter would receive the highest priority to ensure immediate access is made available. Provider will answer all support requests in the order that they are received as long as they are pursuant to the guidelines specified in this Section 4(c). If a request is made outside of these times, Provider will respond at the earliest possible time that falls within its business hours as outlined above, following the order in which requests are received. The type of support that a Customer is entitled to depends on the plan that they are subscribed to and Provider reserves the right to decline providing support if contacted through a means that is not supported by the Customer’s current plan. Support will only be provided to Authorized Users and will not be provided to anyone else, including, but not limited to, registered non-administrators, people and/or persons claiming to be an administrator without being able to prove their identity, and employees or executives of the Customer who are not Authorized Users. Before contacting Provider’s support services, the Customer must have used due diligence in exhausting all attempts to investigate and solve their problem on their own, including, but not limited to, the use of the Provider help center. The Customer agrees to use the Provider support services on a reasonable basis and when necessary. Provider reserves the right, in its sole and absolute discretion, to terminate or suspend the support services for Customers fail to use the support services in accordance to the terms hereof.
                    </li>
                    <li>
                        (d)	Data Backup. Provider will take industry-standard precautions to maintain and back up Customer’s data on a periodic basis. Provider takes daily snapshots to help ensure that Customer data will be maintained even in the highly unlikely event of server downtime. The Services do not replace the need for Customer to maintain regular data backups or redundant data archives. PROVIDER HAS NO OBLIGATION OR LIABILITY FOR ANY LOSS, ALTERATION, DESTRUCTION, DAMAGE, CORRUPTION OR RECOVERY OF CUSTOMER DATA.
                    </li>
                    <li>
                        (e)	For Customers that request, in writing, data migration services to be provided by Provider, there will be additional cost for such transfer(s). Minimum cost for such data migration services is $500 per project, however exact costing is determined on a case-by-case basis by Provider.
                    </li>
                </ul>
                <h4>5. <u>Fees & Plans, Payments and Refunds.</u></h4>
                <ul className="terms">
                    <li>
                        (a) <u>Fees</u>. Customer shall pay Provider the fees (“<strong>Fees</strong>”) as set forth in the plan purchased by Customer without setoff or deduction. Customer shall make all payments hereunder in US dollars on or before the due date set forth in the plan purchased by Customer. If Customer fails to make any payment when due, without limiting Provider’s other rights and remedies: (i) Provider may charge interest on the past due amount at the rate of 1.5% per month or, if lower, the maximum amount permitted under applicable Law; (ii) Customer shall reimburse Provider for all costs incurred by Provider in collecting any late payments or interest, including legal fees, court costs, and collection agency fees; and (iii) if such failure continues for 5 days or more, Provider may suspend Customer’s and its Authorized Users’ access to any portion or all of the Services until such amounts are paid in full. Any charge-backs made by Customers against Provider will incur a $50 service fee per charge-back, in addition to the existing amount charged back and owed to Provider. If at the end of any Term the plan that Customer had purchased during said Term is no longer available, Customer shall be automatically migrated to the most similar plan then available unless Customer advises Provider in writing stating that it would like to purchase another plan. Provider at all times reserves the right to modify and remove existing plans, and make available new plans at its sole and absolute discretion.
                    </li>
                    <li>
                        (b) <u>Refunds</u>. Refunds will not be given to Customers who cancel their service during their billing cycle. Customers on monthly plans will be charged at the end of each billing cycle in arrears for the previous month in order to account for overages, if applicable. Customers on yearly plans who cancel prior to the end of any given Term will not be provided a refund but will be permitted to continue using the Services until the end of the then-current Term.
                    </li>
                    <li>
                        (b) <u>Taxes</u>. All Fees and other amounts payable by Customer under this Agreement are exclusive of taxes and similar assessments (except for those Customers in Canada). Customer is responsible for all value added tax, use and excise taxes, and any other similar taxes, duties and charges of any kind imposed by any federal, provincial, territorial or local governmental entity on any amounts payable by Customer hereunder, other than any taxes imposed on Provider’s income.
                    </li>
                </ul>
                <h4>6. <u>Confidential Information</u>.</h4>
                <ul className="terms">
                    <li>
                        From time to time during the Term, either Party may disclose or make available to the other Party information about its business affairs, products, confidential intellectual property, trade secrets, third-party confidential information, and other sensitive or proprietary information, whether orally or in written, electronic, or other form or media, and whether or not marked, designated or otherwise identified as “confidential” (collectively, “Confidential Information”). Confidential Information does not include information that, at the time of disclosure is: (a) in the public domain; (b) known to the receiving Party at the time of disclosure; (c) rightfully obtained by the receiving Party on a non-confidential basis from a third party; or (d) independently developed by the receiving Party. The receiving Party shall not disclose the disclosing Party’s Confidential Information to any person or entity, except to the receiving Party’s employees who have a need to know the Confidential Information for the receiving Party to exercise its rights or perform its obligations hereunder. Notwithstanding the foregoing, each Party may disclose Confidential Information to the limited extent required (i) in order to comply with the order of a court or other governmental body, or as otherwise necessary to comply with applicable law, provided that the Party making the disclosure pursuant to the order shall first have given written notice to the other Party and made a reasonable effort to obtain a protective order; or (ii) to establish a Party’s rights under this Agreement, including to make required court filings. On the expiration or termination of the Agreement, the receiving Party shall promptly return to the disclosing Party all copies, whether in written, electronic, or other form or media, of the disclosing Party’s Confidential Information, or destroy all such copies and certify in writing to the disclosing Party that such Confidential Information has been destroyed. Each Party’s obligations of non-disclosure with regard to Confidential Information are effective as of the Effective Date and will expire five (5) years from the date first disclosed to the receiving Party; provided, however, with respect to any Confidential Information that constitutes a trade secret (as determined under applicable law), such obligations of non-disclosure will survive the termination or expiration of this Agreement for as long as such Confidential Information remains subject to trade secret protection under applicable law.
                    </li>
                </ul>
                <h4> 7. <u>Intellectual Property Ownership; Feedback</u>.</h4>
                <ul className="terms">
                    <li>
                        (a) <u>Provider IP</u>. Customer acknowledges that, as between Customer and Provider, Provider owns all right, title, and interest, including all intellectual property rights, in and to the Provider IP and, with respect to Third-Party Products, the applicable third-party providers own all right, title, and interest, including all intellectual property rights, in and to the Third-Party Products.
                    </li>
                    <li>
                        (b) <u>Customer Data</u>. Provider acknowledges that, as between Provider and Customer, Customer owns all right, title, and interest, including all intellectual property rights, in and to the Customer Data. Customer hereby grants to Provider a non-exclusive, royalty-free, worldwide license to reproduce, distribute, and otherwise use and display the Customer Data and perform all acts with respect to the Customer Data as may be necessary for Provider to provide the Services to Customer, and a non-exclusive, perpetual, irrevocable, royalty-free, worldwide license to reproduce, distribute, modify, and otherwise use and display Customer Data incorporated within the Aggregated Statistics. Customer also grants to Provider permission to use Customer’s name and logo in Provider’s marketing and promotional materials.
                    </li>
                    <li>
                        (c) <u>Feedback</u>. If Customer or any of its employees or contractors sends or transmits any communications or materials to Provider by mail, email, telephone, or otherwise, suggesting or recommending changes to the Provider IP, including without limitation, new features or functionality relating thereto, or any comments, questions, suggestions, or the like (“<strong>Feedback</strong>”), Provider is free to use such Feedback irrespective of any other obligation or limitation between the Parties governing such Feedback. Customer hereby assigns to Provider on Customer’s behalf, and on behalf of its employees, contractors and/or agents, all right, title, and interest in, and Provider is free to use, without any attribution or compensation to any party, any ideas, know-how, concepts, techniques, or other intellectual property rights contained in the Feedback, for any purpose whatsoever, although Provider is not required to use any Feedback.
                    </li>
                </ul>
                <h4>8. <u>Limited Warranty and Warranty Disclaimer</u>.</h4>
                <ul className="terms">
                    <li>
                        (a) Provider warrants that the Services will conform in all material respects to the service levels set forth in Section 4(a) when accessed and used in accordance with the Documentation. Provider does not make any representations or guarantees regarding uptime or availability of the Services unless specifically identified in Section 4(a). The remedies set forth in Section 9 are Customer’s sole remedies and Provider’s sole liability under the limited warranty set forth in this Section 8(a). The foregoing warranty does not apply, and provider strictly disclaims all warranties, with respect to any third-party products.
                    </li>
                    <li>
                        (b) Customer represents, warrants and covenants to Provider that Customer owns or otherwise has, and will have, the necessary rights and consents in and relating to the Customer Data so that, as received by Provider and Processed in accordance with this Agreement, they do not and will not infringe, misappropriate or otherwise violate any IP Rights, or any privacy or other rights of any third party or violate any applicable Law.
                    </li>
                    <li>
                        (c) EXCEPT FOR THE LIMITED WARRANTY SET FORTH IN SECTION 8(a), THE PROVIDER IP IS PROVIDED “AS IS” AND PROVIDER HEREBY DISCLAIMS ALL WARRANTIES AND CONDITIONS, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE. PROVIDER SPECIFICALLY DISCLAIMS ALL IMPLIED WARRANTIES AND CONDITIONS OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT, AND ALL WARRANTIES ARISING FROM COURSE OF DEALING, USAGE, OR TRADE PRACTICE. EXCEPT FOR THE LIMITED WARRANTY SET FORTH IN SECTION 8(a), PROVIDER MAKES NO WARRANTY OF ANY KIND THAT THE PROVIDER IP, OR ANY PRODUCTS OR RESULTS OF THE USE THEREOF, WILL MEET CUSTOMER’S OR ANY OTHER PERSON’S REQUIREMENTS, OPERATE WITHOUT INTERRUPTION, ACHIEVE ANY INTENDED RESULT, BE COMPATIBLE OR WORK WITH ANY SOFTWARE, SYSTEM OR OTHER SERVICES, OR BE SECURE, ACCURATE, COMPLETE, FREE OF HARMFUL CODE, OR ERROR FREE.
                    </li>
                </ul>
                <h4>9. <u>Indemnification</u>.</h4>
                <ul className="terms">
                    <li>
                        (a) <u>Provider Indemnification</u>.
                        <ul className="terms">
                            <li>
                                (i) Provider shall indemnify, defend, and hold harmless Customer from and against any and all losses, damages, liabilities, costs including reasonable legal fees) (“<strong>Losses</strong>”) incurred by Customer resulting from any third-party claim, suit, action, or proceeding (“<strong>Third-Party Claim</strong>”) that the Services, or any use of the Services in accordance with this Agreement, infringes or misappropriates such third party’s Canadian intellectual property rights, provided that Customer promptly notifies Provider in writing of the claim, cooperates with Provider, and allows Provider sole authority to control the defense and settlement of such claim.
                            </li>
                            <li>
                                (ii) If such a claim is made or appears possible, Customer agrees to permit Provider, at Provider’s sole discretion, to (A) modify or replace the Services, or component or part thereof, to make it non-infringing, or (B) obtain the right for Customer to continue use. If Provider determines that neither alternative is reasonably available, Provider may terminate this Agreement, in its entirety or with respect to the affected component or part, effective immediately on written notice to Customer.
                            </li>
                            <li>
                                (iii) This Section 9(a) will not apply to the extent that the alleged infringement arises from: (A) use of the Services in combination with data, software, hardware, equipment, or technology not provided by Provider or authorized by Provider in writing; (B) modifications to the Services not made by Provider; (C) Customer Data; or (D) Third-Party Products.
                            </li>
                        </ul>
                    </li>
                    <li>
                        (b) <u>Customer Indemnification</u>. Customer shall indemnify, hold harmless, and, at Provider’s option, defend Provider from and against any Losses resulting from any Third-Party Claim that the Customer Data, or any use of the Customer Data in accordance with this Agreement, infringes or misappropriates such third party’s intellectual property rights and any Third-Party Claims based on Customer’s or any Authorized User’s (i) negligence or willful misconduct; (ii) use of the Services in a manner not authorized by this Agreement; (iii) use of the Services in combination with data, software, hardware, equipment or technology not provided by Provider or authorized by Provider in writing; or (iv) modifications to the Services not made by Provider, provided that Customer may not settle any Third-Party Claim against Provider unless Provider consents to such settlement, and further provided that Provider will have the right, at its option, to defend itself against any such Third-Party Claim or to participate in the defence thereof by counsel of its own choice.
                    </li>
                    <li>
                        (c) <u>Sole Remedy</u>. THIS SECTION 9 SETS FORTH CUSTOMER’S SOLE REMEDIES AND PROVIDER’S SOLE LIABILITY AND OBLIGATION FOR ANY ACTUAL, THREATENED, OR ALLEGED CLAIMS THAT THE SERVICES INFRINGE, MISAPPROPRIATE, OR OTHERWISE VIOLATE ANY INTELLECTUAL PROPERTY RIGHTS OF ANY THIRD PARTY. IN NO EVENT WILL PROVIDER’S LIABILITY UNDER THIS SECTION 9 EXCEED THE FEES PAID BY THE CUSTOMER FOR THE SERVICES.
                    </li>
                </ul>
                <h4>10. <u>LIMITATIONS OF LIABILITY</u>.</h4>
                <ul className="terms">
                    <li>
                        IN NO EVENT WILL PROVIDER BE LIABLE UNDER OR IN CONNECTION WITH THIS AGREEMENT UNDER ANY LEGAL OR EQUITABLE THEORY, INCLUDING BREACH OF CONTRACT, TORT (INCLUDING NEGLIGENCE), STRICT LIABILITY, AND OTHERWISE, FOR ANY: (a) CONSEQUENTIAL, INCIDENTAL, INDIRECT, EXEMPLARY, SPECIAL, AGGRAVATED, OR PUNITIVE DAMAGES; (b) INCREASED COSTS, DIMINUTION IN VALUE OR LOST BUSINESS, PRODUCTION, REVENUES, OR PROFITS; (c) LOSS OF GOODWILL OR REPUTATION; (d) USE, INABILITY TO USE, LOSS, INTERRUPTION, DELAY OR RECOVERY OF ANY DATA, OR BREACH OF DATA OR SYSTEM SECURITY; OR (e) COST OF REPLACEMENT GOODS OR SERVICES, IN EACH CASE REGARDLESS OF WHETHER PROVIDER WAS ADVISED OF THE POSSIBILITY OF SUCH LOSSES OR DAMAGES OR SUCH LOSSES OR DAMAGES WERE OTHERWISE FORESEEABLE. IN NO EVENT WILL PROVIDER’S AGGREGATE LIABILITY ARISING OUT OF OR RELATED TO THIS AGREEMENT UNDER ANY LEGAL OR EQUITABLE THEORY, INCLUDING BREACH OF CONTRACT, TORT (INCLUDING NEGLIGENCE), STRICT LIABILITY, AND OTHERWISE EXCEED ONE TIMES THE TOTAL AMOUNTS PAID AND AMOUNTS ACCRUED BUT NOT YET PAID TO PROVIDER UNDER THIS AGREEMENT IN THE ONE YEAR PERIOD PRECEDING THE EVENT GIVING RISE TO THE CLAIM.
                    </li>
                </ul>
                <h4>11. <u>Term and Termination</u>.</h4>
                <ul className="terms">
                    <li>
                        (a) <u>Term</u>. The initial term of this Agreement begins on the effective date (“<strong>Effective Date</strong>”) specified in the plan purchased by the Customer and, unless terminated earlier pursuant to this Agreement’s express provisions, will continue in effect until such time that is specified in said plan (the “<strong>Initial Term”</strong>). This Agreement will automatically renew at the end of each Term or Renewal Term, as applicable, unless earlier terminated pursuant to this Agreement’s express provisions or either Party gives the other Party written notice of non-renewal no less than sixty (60) days prior to the expiration of the then-current term (each a “<strong>Renewal Term</strong>” and together with the Initial Term, the “<strong>Term</strong>”).
                    </li>
                    <li>
                        (b) <u>Termination</u>. In addition to any other express termination right set forth in this Agreement:
                        <ul className="terms">
                            <li>
                                (i) Provider may terminate this Agreement, effective on written notice to Customer, if Customer: (A) fails to pay any amount when due hereunder, and such failure continues more than five (5) days after Provider’s delivery of written notice thereof; or (B) breaches any of its obligations under this Agreement;
                            </li>
                            <li>
                                (ii) either Party may terminate this Agreement, effective immediately upon written notice to the other Party, if the other Party: (A) becomes insolvent or is generally unable to pay, or fails to pay, its debts as they become due; (B) files or has filed against it, a petition for voluntary or involuntary bankruptcy or otherwise becomes subject, voluntarily or involuntarily, to any proceeding under any domestic or foreign bankruptcy or insolvency law; (C) makes or seeks to make a general assignment for the benefit of its creditors; or (D) applies for or has appointed a receiver, trustee, custodian, or similar agent appointed by order of any court of competent jurisdiction to take charge of or sell any material portion of its property or business.
                            </li>
                        </ul>
                    </li>
                    <li>
                        (c) <u>Effect of Expiration or Termination</u>. Upon expiration or earlier termination of this Agreement, Customer shall immediately discontinue use of the Provider IP and, without limiting Customer’s obligations under Section 6, Customer shall delete, destroy, or return all copies of the Provider IP and certify in writing to the Provider that the Provider IP has been deleted or destroyed. No expiration or termination will affect Customer’s obligation to pay all Fees that may have become due before such expiration or termination, or entitle Customer to any refund.
                    </li>
                    <li>
                        (d) <u>Survival</u>. This Section 11(d) and Section 1, Section 5, Section 6, Section 7, Section 8(b), Section 9, Section 10, and Section 13 shall survive any termination or expiration of this Agreement. No other provisions of this Agreement survive the expiration or earlier termination of this Agreement.
                    </li>
                </ul>
                <h4>12. <u>Data Security</u>.</h4>
                <ul className="terms">
                    <li>
                        (a) <u>Information Security Obligations</u>. Provider will employ security measures in accordance with applicable Law, and Provider’s data privacy and security policies as amended from time to time.
                    </li>
                    <li>
                        (b) <u>Data Breach Procedures.</u> In the event of a data breach that involves the personal or business information of Customer, Provider will notify the Customer about the event and disclose the relevant details pertaining to the breach including, 1) time and place of the breach 2) scope and type of the data breach including the individuals and types of information affected 3) potential risks associated with the data breach, in accordance with applicable laws.
                    </li>
                    <li>
                        (c) <u>Customer Control and Responsibility</u>. Customer has and will retain sole responsibility for: (i) all Customer Data, including its content and use; (ii) all information, instructions and materials provided by or on behalf of Customer or any Authorized User in connection with the Services; (iii) Customer Systems; (iv) the security and use of Access Credentials of Customer and its Authorized Users; and (v) all access to and use of the Services and Provider Materials directly or indirectly by or through the Customer Systems or its or its Authorized Users’ Access Credentials, with or without Customer’s knowledge or consent, including all results obtained from, and all conclusions, decisions and actions based on, such access or use. The Customer is responsible for disclosing any known data breaches that occur within and outside the confines of their own organization that may potentially affect the data security of any information that Provider holds on behalf of the Customer. For example, if the Customer knows that the Access Credentials of an Authorized User have been phished, stolen or otherwise compromised in any way, Customer must forthwith notify Provider about the event to limit and mitigate any further potential data loss that may affect Customer, or may affect the Customer’s information.
                    </li>
                    <li>
                        (d) <u>Access and Security</u>. Customer shall employ all physical, administrative and technical controls, screening and security procedures and other safeguards necessary to: (i) securely administer the distribution and use of all Access Credentials and protect against any unauthorized access to, or use of, the Services; and (ii) control the content and use of Customer Data, including the uploading or other provision of Customer Data for processing by the Services.
                    </li>
                </ul>
                <h4>13. <u>Miscellaneous</u>.</h4>
                <ul className="terms">
                    <li>
                        (a) <u>Entire Agreement</u>. This Agreement, together with any other documents incorporated herein by reference and all related exhibits, constitutes the sole and entire agreement of the Parties with respect to the subject matter of this Agreement and supersedes all prior and contemporaneous understandings, agreements, and representations and warranties, both written and oral, with respect to such subject matter.
                    </li>
                    <li>
                        (b) <u>Notices</u>. All notices, requests, consents, claims, demands, waivers, and other communications hereunder (each, a “<strong>Notice</strong>”) must be in writing and addressed to the Parties at the addresses set forth on the first page of this Agreement (or to such other address that may be designated by the Party giving Notice from time to time in accordance with this Section). Notices sent in accordance with this Section will be deemed effectively given: (a) when received, if delivered by hand, with signed confirmation of receipt; (b) when received, if sent by a nationally recognized overnight courier, signature required; (c) when sent, if by facsimile or email (in each case, with confirmation of transmission) if sent during the addressee’s normal business hours, and on the next business day if sent after the addressee’s normal business hours; and (d) on the third day after the date mailed by certified or registered mail by the Canada Post Corporation, return receipt requested, postage prepaid.
                    </li>
                    <li>
                        (c) <u>Force Majeure</u>. In no event shall either Party be liable to the other Party, or be deemed to have breached this Agreement, for any failure or delay in performing its obligations under this Agreement (except for any obligations to make payments contemplated hereunder), if and to the extent such failure or delay is caused by any circumstances beyond such Party’s reasonable control, including but not limited to acts of God, flood, fire, earthquake, epidemic, pandemic, explosion, war, terrorism, invasion, riot or other civil unrest, strikes, labour stoppages or slowdowns or other industrial disturbances, or passage of law or any action taken by a governmental or public authority, including imposing an embargo (each a “<strong>Force Majeure Event</strong>”).
                    </li>
                    <li>
                        (d) <u>Amendments and Modifications</u>. No amendment to or modification of this Agreement is effective unless it is in writing and signed by an authorized representative of each Party.
                    </li>
                    <li>
                        (e) <u>Waiver</u>. No waiver by any Party of any of the provisions hereof will be effective unless explicitly set forth in writing and signed by the Party so waiving. Except as otherwise set forth in this Agreement, (i) no failure to exercise, or delay in exercising, any rights, remedy, power, or privilege arising from this Agreement will operate or be construed as a waiver thereof, and (ii) no single or partial exercise of any right, remedy, power, or privilege hereunder will preclude any other or further exercise thereof or the exercise of any other right, remedy, power, or privilege.
                    </li>
                    <li>
                        (f) <u>Severability</u>. If any provision of this Agreement is invalid, illegal, or unenforceable in any jurisdiction, such invalidity, illegality, or unenforceability will not affect any other term or provision of this Agreement or invalidate or render unenforceable such term or provision in any other jurisdiction.
                    </li>
                    <li>
                        (g) <u>Governing Law</u>. This Agreement and all related documents including all exhibits attached hereto, and all matters arising out of or relating to this Agreement, whether sounding in contract, tort, or statute, are governed by, and construed in accordance with, the laws of the Province of Ontario, the federal laws of Canada applicable therein, without giving effect to any choice or conflict of law provision or rule (whether of the Province of Ontario or any other jurisdiction) that would cause the application of the laws of any jurisdiction other than those of the Province of Ontario.
                    </li>
                    <li>
                        (h) <u>Choice of Forum</u>. Any legal suit, action, litigation, or proceeding of any kind whatsoever in any way arising out of, from or relating to this Agreement, including all statements of work, exhibits, schedules, attachments, and appendices attached to this Agreement, the services provided hereunder, and all contemplated transactions, shall be instituted in the courts of the Province of Ontario, and each Party irrevocably submits to the exclusive jurisdiction of such courts in any such suit, action, litigation or proceeding. Service of process, summons, notice, or other document by mail to such Party’s address set forth herein shall be effective service of process for any suit, action, litigation or other proceeding brought in any such court. Each Party agrees that a final judgment in any such suit, action, litigation, or proceeding is conclusive and may be enforced in other jurisdictions by suit on the judgment or in any other manner provided by law.
                    </li>
                    <li>
                        (i) <u>Assignment</u>. Customer may not assign any of its rights or delegate any of its obligations hereunder, in each case whether voluntarily, involuntarily, by operation of law or otherwise, without the prior written consent of Provider. Any purported assignment or delegation in violation of this Section will be null and void. No assignment or delegation will relieve the assigning or delegating Party of any of its obligations hereunder. This Agreement is binding upon and inures to the benefit of the Parties and their respective permitted successors and assigns.
                    </li>
                </ul>
            </div>


        </div>

    );
}

export default TermsAndConditions;