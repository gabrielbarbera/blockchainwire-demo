import React, { useState } from 'react';
import { Button } from '../../../../components/ui/Button';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface TermsData {
  recaptchaCompleted: boolean;
  termsAgreed: boolean;
}

interface Props {
  data: TermsData;
  onChange: (updates: Partial<TermsData>) => void;
  onSubmit: () => void;
  onBack: () => void;
}

const TermsStep: React.FC<Props> = ({ data, onChange, onSubmit, onBack }) => {
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    limitations: false,
    warranties: false,
    liability: false,
    thirdParty: false,
    proprietary: false,
    governing: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleRecaptchaChange = (checked: boolean) => {
    onChange({ recaptchaCompleted: checked });
  };

  const handleTermsAgreed = (checked: boolean) => {
    onChange({ termsAgreed: checked });
  };

  const canSubmit = () => {
    return data.recaptchaCompleted && data.termsAgreed;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-secondary-light p-6 sm:p-8">
      <h2 className="text-xl sm:text-2xl font-bold text-secondary-black mb-6">Terms & Conditions</h2>
      
      <div className="mb-6">
        <p className="text-sm text-secondary-dark mb-6">
          By using the Blockchainwire.io website ("Site"), users agree to be bound by the following terms of use.
        </p>

        {/* Section A: Limitations on Scope of Use */}
        <div className="mb-4">
          <button
            onClick={() => toggleSection('limitations')}
            className="w-full flex items-center justify-between p-4 bg-secondary-light/30 rounded-lg hover:bg-secondary-light/50 transition-colors"
          >
            <span className="font-bold text-secondary-black">A. Limitations on Scope of Use</span>
            {expandedSections.limitations ? (
              <ChevronUp size={20} className="text-secondary-medium" />
            ) : (
              <ChevronDown size={20} className="text-secondary-medium" />
            )}
          </button>
          {expandedSections.limitations && (
            <div className="mt-2 p-4 bg-white border border-secondary-light rounded-lg text-sm text-secondary-dark space-y-3">
              <p>
                Use of the Blockchain Wire Site is limited to submission of news releases for distribution 
                via Blockchain Wire, retrieving RSS feeds, direct email and the reading of releases, 
                marketing and other materials.
              </p>
              <p>
                You agree not to use the Blockchain Wire Site for any other purposes, including, without 
                limitation, to store, aggregate, reproduce or distribute information available on the Site 
                in any manner or to compete directly or indirectly with Blockchain Wire; to interfere with 
                or disrupt the operation of Site or the networks or servers connected to the Site in any 
                manner; to impersonate any person or entity or otherwise misrepresent your affiliation with 
                any person or entity; to upload, post or otherwise transmit any content that infringes the 
                proprietary rights of any third party, or is otherwise unlawful or offensive; to harass or 
                otherwise harm Blockchain Wire or any other person or entity; or to engage in commercial 
                activities of any kind without prior consent of Blockchain Wire.
              </p>
              <p>
                Any unauthorized use of the Blockchain Wire Site may result in termination of all rights 
                to use the Site and penalties to the full extent provided by law.
              </p>
              <p>
                All submissions to Blockchain Wire are governed by the terms and conditions set forth herein 
                and agreed to by you or an agent of your company. By submitting a press release for 
                dissemination by Blockchain Wire, you agree to be bound by the terms and conditions set 
                forth herein.
              </p>
            </div>
          )}
        </div>

        {/* Section B: Disclaimer of Warranties */}
        <div className="mb-4">
          <button
            onClick={() => toggleSection('warranties')}
            className="w-full flex items-center justify-between p-4 bg-secondary-light/30 rounded-lg hover:bg-secondary-light/50 transition-colors"
          >
            <span className="font-bold text-secondary-black">B. Disclaimer of Warranties</span>
            {expandedSections.warranties ? (
              <ChevronUp size={20} className="text-secondary-medium" />
            ) : (
              <ChevronDown size={20} className="text-secondary-medium" />
            )}
          </button>
          {expandedSections.warranties && (
            <div className="mt-2 p-4 bg-white border border-secondary-light rounded-lg text-sm text-secondary-dark">
              <p>
                You agree that use of the Site is entirely at your own risk. EXCEPT AS SPECIFICALLY PROVIDED 
                IN THIS AGREEMENT, THE SITE AND THE MATERIALS ON THE SITE ARE PROVIDED AS IS, WITHOUT WARRANTIES 
                OR CONDITIONS OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, WITHOUT LIMITATION, THE IMPLIED 
                WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. Blockchain 
                Wire does not make any representations or warranties that the Site or materials on the Site or 
                products and services purchased at or through the Site will meet your requirements or expectations, 
                or that the operation of the Site will be uninterrupted, timely, secure or error-free. Some 
                jurisdictions do not allow the exclusion of certain warranties, so some or all of the above 
                exclusions may not apply to you.
              </p>
            </div>
          )}
        </div>

        {/* Section C: Limitation of Liability */}
        <div className="mb-4">
          <button
            onClick={() => toggleSection('liability')}
            className="w-full flex items-center justify-between p-4 bg-secondary-light/30 rounded-lg hover:bg-secondary-light/50 transition-colors"
          >
            <span className="font-bold text-secondary-black">C. Limitation of Liability</span>
            {expandedSections.liability ? (
              <ChevronUp size={20} className="text-secondary-medium" />
            ) : (
              <ChevronDown size={20} className="text-secondary-medium" />
            )}
          </button>
          {expandedSections.liability && (
            <div className="mt-2 p-4 bg-white border border-secondary-light rounded-lg text-sm text-secondary-dark">
              <p>
                You agree that Blockchain Wire will not be held liable for any improper or incorrect use of 
                the Site or the materials on the Site and assumes no responsibility for any user's activities 
                on the Site or for the inaccuracy of any content on the Site. In no event will Blockchain Wire 
                be liable for any direct, indirect, incidental, special, exemplary or consequential damages, 
                including, without limitation, procurement of substitute goods or services, loss of use, data 
                or profits, or business interruption, arising in any way out of the use of (or inability to use) 
                the Site or the materials on the Site or the inaccuracy of any content on the Site, however 
                caused, under any theory of liability. This disclaimer of liability applies to any damages or 
                injury under any cause of action, including, without limitation, those caused by any failure 
                of performance, error, omission, interruption, deletion, defect, delay in operation or transmission, 
                computer virus or bug, communication line failure, theft, destruction or alteration of or 
                unauthorized access to the Site or materials on the Site. Some jurisdictions do not allow the 
                exclusion of liability for incidental or consequential damages, so some or all of the above 
                exclusions or limitations may not apply to you.
              </p>
            </div>
          )}
        </div>

        {/* Section D: Disclaimer of Liability for Third-Party Content */}
        <div className="mb-4">
          <button
            onClick={() => toggleSection('thirdParty')}
            className="w-full flex items-center justify-between p-4 bg-secondary-light/30 rounded-lg hover:bg-secondary-light/50 transition-colors"
          >
            <span className="font-bold text-secondary-black">D. Disclaimer of Liability for Third-Party Content and Links</span>
            {expandedSections.thirdParty ? (
              <ChevronUp size={20} className="text-secondary-medium" />
            ) : (
              <ChevronDown size={20} className="text-secondary-medium" />
            )}
          </button>
          {expandedSections.thirdParty && (
            <div className="mt-2 p-4 bg-white border border-secondary-light rounded-lg text-sm text-secondary-dark">
              <p>
                You agree that Blockchain Wire is not responsible and will not be held liable for any third-party 
                content on the Site or any third-party content, products or services available on other Web sites 
                accessed through links from the Site. Links to third-party sites are for your convenience only, 
                and their inclusion on the Blockchain Wire Site does not imply any endorsement, guarantee, warranty 
                or representation by Blockchain Wire.
              </p>
            </div>
          )}
        </div>

        {/* Section E: Proprietary Rights */}
        <div className="mb-4">
          <button
            onClick={() => toggleSection('proprietary')}
            className="w-full flex items-center justify-between p-4 bg-secondary-light/30 rounded-lg hover:bg-secondary-light/50 transition-colors"
          >
            <span className="font-bold text-secondary-black">E. Proprietary Rights</span>
            {expandedSections.proprietary ? (
              <ChevronUp size={20} className="text-secondary-medium" />
            ) : (
              <ChevronDown size={20} className="text-secondary-medium" />
            )}
          </button>
          {expandedSections.proprietary && (
            <div className="mt-2 p-4 bg-white border border-secondary-light rounded-lg text-sm text-secondary-dark">
              <p>
                The Blockchain Wire Site and all materials on the Site, including, without limitation, 
                "Blockchain Wire" and all other trademarks and logos on the Site, are protected by copyrights, 
                trademarks, service marks, patents or other proprietary rights and laws. Except as specifically 
                permitted in this Agreement, or by express written consent of Blockchain Wire, you may not use 
                the Site or the material on the Site in any manner.
              </p>
            </div>
          )}
        </div>

        {/* Section F: Governing Law */}
        <div className="mb-4">
          <button
            onClick={() => toggleSection('governing')}
            className="w-full flex items-center justify-between p-4 bg-secondary-light/30 rounded-lg hover:bg-secondary-light/50 transition-colors"
          >
            <span className="font-bold text-secondary-black">F. Governing Law and Venue</span>
            {expandedSections.governing ? (
              <ChevronUp size={20} className="text-secondary-medium" />
            ) : (
              <ChevronDown size={20} className="text-secondary-medium" />
            )}
          </button>
          {expandedSections.governing && (
            <div className="mt-2 p-4 bg-white border border-secondary-light rounded-lg text-sm text-secondary-dark">
              <p>
                These Terms of Use shall be governed by and construed in accordance with the laws of the United 
                States. Any dispute arising under or related in any way to these Terms & Conditions shall be 
                adjudicated in a court of competent jurisdiction in the state of Wyoming.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* reCAPTCHA */}
      <div className="mb-6 p-4 bg-secondary-light/30 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            id="recaptcha"
            checked={data.recaptchaCompleted}
            onChange={(e) => handleRecaptchaChange(e.target.checked)}
            className="w-4 h-4 text-primary border-secondary-light rounded focus:ring-primary"
          />
          <label htmlFor="recaptcha" className="text-sm font-medium text-secondary-dark">
            I'm not a robot
          </label>
        </div>
        <p className="text-xs text-secondary-medium pl-6">
          This is a simplified reCAPTCHA implementation. In production, integrate with Google reCAPTCHA API.
        </p>
      </div>

      {/* Terms Agreement */}
      <div className="mb-6 p-4 bg-secondary-light/30 rounded-lg">
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id="termsAgreed"
            checked={data.termsAgreed}
            onChange={(e) => handleTermsAgreed(e.target.checked)}
            className="w-4 h-4 text-primary border-secondary-light rounded focus:ring-primary mt-1"
          />
          <label htmlFor="termsAgreed" className="text-sm font-medium text-secondary-dark">
            I agree to the Terms & Conditions outlined above.
          </label>
        </div>
      </div>

      <div className="flex justify-between mt-8 pt-6 border-t border-secondary-light">
        <Button variant="outline" onClick={onBack} size="lg">
          Previous
        </Button>
        <Button 
          onClick={onSubmit}
          disabled={!canSubmit()}
          size="lg"
          className={!canSubmit() ? 'opacity-50 cursor-not-allowed' : ''}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default TermsStep;

