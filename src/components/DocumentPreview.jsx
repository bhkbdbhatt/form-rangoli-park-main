import React from 'react';

export default function DocumentPreview({ formData, notesHtml }) {
  return (
    <div
      id="legal-document-blueprint"
      style={{
        backgroundColor: '#ffffff',
        padding: '50px',
        minHeight: '1000px',
        color: '#000000',
      }}
    >
      {/* Main heading */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h3
          style={{
            margin: '0 0 5px 0',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
        >
          રાજકોટ જિલ્લા ગ્રાહક તકરાર નિવારણ કમિશન સમક્ષ (ગુજરાત)
        </h3>

        <p style={{ margin: 0, fontSize: '14px' }}>
          <strong>ગ્રાહક ફરિયાદ નંબર:</strong>{' '}
          {formData.complaintNumber || '___'} / {formData.currentYear}
        </p>
      </div>

      {/* Complainant details */}
      <div style={{ marginBottom: '15px' }}>
        <p style={{ margin: '0 0 5px 0' }}>
          <strong>ફરિયાદી:</strong>
        </p>

        <div
          style={{
            paddingLeft: '20px',
            fontSize: '14px',
            lineHeight: '1.5',
          }}
        >
          <p style={{ margin: 0 }}>
            <strong>
              {formData.complainantName ||
                '______________________________________'}
            </strong>
          </p>

          <p style={{ margin: 0 }}>
            (ઉંમર: આશરે {formData.complainantAge || '___'} વર્ષ, સિનિયર સિટિઝન)
          </p>

          <p style={{ margin: 0 }}>
            પત્ની / પિતા: {formData.spouseName || '_____________________'}
          </p>

          <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
            {formData.address ||
              '_____________________________________________________'}
          </p>

          <p style={{ margin: 0 }}>
            મોબાઈલ નંબર:{' '}
            {formData.complainantMobile || '_____________________'}
          </p>
        </div>

        <p style={{ textAlign: 'right', margin: '5px 0 0 0' }}>
          <strong>... ફરીયાદી</strong>
        </p>
      </div>

      <div style={{ textAlign: 'center', margin: '10px 0' }}>
        <p style={{ margin: 0 }}>વિરુદ્ધ</p>
      </div>

      {/* Opposite parties */}
      <div style={{ marginBottom: '20px' }}>
        <div
          style={{
            paddingLeft: '20px',
            fontSize: '14px',
            lineHeight: '1.5',
          }}
        >
          <p style={{ margin: '0 0 8px 0' }}>
            ૧. {formData.op1Title}
          </p>

          <p
            style={{
              margin: '0 0 15px 20px',
              whiteSpace: 'pre-wrap',
            }}
          >
            {formData.op1Address}
          </p>

          <p style={{ margin: '0 0 5px 0' }}>
            ૨. {formData.op2Title}
          </p>

          <p
            style={{
              margin: '0 0 0 20px',
              whiteSpace: 'pre-wrap',
            }}
          >
            {formData.op2Address}
          </p>

          {formData.op2Mobile && (
            <p style={{ margin: '0 0 0 20px' }}>
              મોબાઈલ નંબર: {formData.op2Mobile}
            </p>
          )}
        </div>

        <p style={{ textAlign: 'right', margin: '5px 0 0 0' }}>
          ... સામાવાળા (OPs)
        </p>
      </div>

      {/* Complaint section */}
      <div
        style={{
          borderTop: '1px solid #000',
          borderBottom: '1px solid #000',
          padding: '5px 0',
          marginBottom: '20px',
          textAlign: 'center',
        }}
      >
        <p style={{ margin: 0 }}>
          ગ્રાહક સુરક્ષા અધિનિયમ, ૨૦૧૯ ની કલમ ૩૫ હેઠળની ફરિયાદ
        </p>
      </div>

      <div
        style={{
          fontSize: '14px',
          lineHeight: '1.6',
          textAlign: 'justify',
        }}
      >
        <p style={{ margin: '0 0 10px 0' }}>
          સવિનય રજૂઆત કે:
        </p>

        {/* Section 1 */}
        <p style={{ margin: '0 0 5px 0' }}>
          <strong>૧. ફરિયાદીની વિગત અને સિનિયર સિટિઝન દરજ્જો:</strong>
        </p>

        <ol style={{ margin: '0 0 15px 0', paddingLeft: '20px' }}>
          <li>
            ફરિયાદી {formData.complainantAge || ''} વર્ષના સિનિયર સિટિઝન
            છે અને ઉપર દર્શાવેલ સરનામાની મિલકતના કાયદેસરના નોંધાયેલા માલિક
            છે. ફરિયાદી ગ્રાહક સુરક્ષા અધિનિયમ, ૨૦૧૯ ની કલમ ૨(૭) હેઠળ
            "ગ્રાહક" ની વ્યાખ્યામાં આવે છે.
          </li>

          <li>
            ફરિયાદીની મોટી ઉંમર ({formData.complainantAge || ''} વર્ષ) અને
            શારીરિક મર્યાદાઓને કારણે, આદરણીય કમિશન સમક્ષ પ્રત્યક્ષ હાજર
            રહેવું મુશ્કેલ હોવાથી વર્ચ્યુઅલ કોર્ટ માર્ગદર્શિકા મુજબ સમગ્ર
            કાર્યવાહી દરમિયાન વીડિયો કોન્ફરન્સિંગ (VC) દ્વારા ઉપસ્થિત
            રહેવાની મંજૂરી માંગવામાં આવે છે.
          </li>
        </ol>

        {/* Section 2 */}
        <p style={{ margin: '0 0 5px 0' }}>
          <strong>૨. સામાવાળાની વિગત:</strong>
        </p>

        <p style={{ margin: '0 0 15px 20px' }}>
          સામાવાળા (સામાવાળા નંબર ૧ અને ૨) જવાબદાર અધિકારીઓ છે, જેઓ આવાસ
          યોજનાના નિર્માણ, આબંટોન અને આજીવન મેન્ટેનન્સ ફંડના સંચાલન માટે
          કાયદેસર રીતે "સેવા આપનાર" (Service Providers) છે.
        </p>

        {/* Section 3 */}
        <p style={{ margin: '0 0 5px 0' }}>
          <strong>૩. કેસની વિગત અને તથ્યો:</strong>
        </p>

        <ol style={{ margin: '0 0 15px 0', paddingLeft: '20px' }}>
          <li>
            મેન્ટેનન્સ રકમની ચુકવણી: ફરિયાદીએ સામાવાળા પાસેથી મિલકતનો
            કબજો મેળવતી વખતે યોજનાની શરતો મુજબ અંદાજે રૂ.{' '}
            {formData.maintenanceAmountDigits || ''}/- (અંકમાં રૂ.{' '}
            {formData.maintenanceAmountWords || '_____'} પૂરા) ની રકમ
            આજીવન મેન્ટેનન્સ / કોર્પસ ફંડ તરીકે પહોંચ નંબર:{' '}
            {formData.receiptNumber || ''} તારીખ:{' '}
            {formData.receiptDate || '//'} થી જમા કરાવેલ છે.
          </li>

          <li>
            ફંડનો હેતુ: આ આજીવન મેન્ટેનન્સ ફંડ સામાવાળા દ્વારા અનામત
            (Trustee) તરીકે માત્ર સોસાયટીની સામાન્ય સગવડો (લિફ્ટ, કોમન
            લાઈટ, પંપ, સ્ટ્રક્ચરલ રીપેરિંગ વગેરે) ના નિભાવ માટે જ એકત્રિત
            કરવામાં આવ્યું હતું.
          </li>

          <li>
            સેવામાં ખામી (Deficiency of Service): સામાવાળાએ મિલકતનો કબજો
            સોંપી દીધા બાદ પણ એકત્રિત કરેલ આજીવન મેન્ટેનન્સની રકમ રૂ.{' '}
            {formData.maintenanceAmountDigits || ''}/- તેમજ તેના પર વ્યાજ
            સોસાયટી/હિતરક્ષક સમિતિ કે ફરિયાદીને હજુ સુધી સોંપેલ નથી કે જમા
            કરેલ નથી.
          </li>

          <li>
            ઓડિટ હિસાબનો અભાવ: વારંવાર લિખિત રજૂઆતો કરવા છતાં સામાવાળાએ આ
            ફંડનું વ્યાજ અને મૂળ રકમનો કોઈ પારદર્શક ઓડિટ હિસાબ આપેલ નથી.
          </li>

          <li>
            ગ્રાહક અધિકારનો ભંગ: સામાવાળા દ્વારા આજીવન મેન્ટેનન્સ ડિપોઝિટની
            રકમ ગેરકાયદેસર રીતે રોકી રાખવી એ ગ્રાહક સુરક્ષા અધિનિયમ, ૨૦૧૯
            ની કલમ ૨(૧૧) હેઠળ સેવામાં ગંભીર ખામી અને કલમ ૨(૪૭) હેઠળ
            અનુચિત વેપાર નીતિ (Unfair Trade Practice) છે.
          </li>
        </ol>

        {/* Section 4 */}
        <p style={{ margin: '0 0 5px 0' }}>
          <strong>૪. ફરિયાદનું કારણ અને હકુમત:</strong>
        </p>

        <p style={{ margin: '0 0 0 20px' }}>
          <b>ફરિયાદનું કારણ:</b> આજીવન મેન્ટેનન્સની રકમ સ્વીકાર્યા બાદ ફંડ
          કે તેનું વ્યાજ પરત ન કરવાના અને હિસાબ ન આપવાના સામાવાળાના વલણને
          કારણે રોજ-બ-રોજ ફરિયાદનું કારણ ઉદ્ભવે છે.
        </p>

        <p style={{ margin: '0 0 15px 20px' }}>
          <b>હકુમત:</b> મિલકત તથા સામાવાળાની કચેરી હકુમતના વિસ્તારમાં આવેલી
          છે, જેથી આ કમિશનને પ્રાદેશિક અને આર્થિક હકુમત છે.
        </p>

        {/* Reliefs */}
        <p style={{ margin: '0 0 5px 0' }}>
          <strong>દાવા દાદ / રાહત માંગણીઓ:</strong>
        </p>

        <p style={{ margin: '0 0 5px 0' }}>
          આદરણીય ગ્રાહક કમિશન સમક્ષ નમ્ર પ્રાર્થના છે કે:
        </p>

        <ol style={{ margin: '0 0 15px 0', paddingLeft: '20px' }}>
          <li>
            ફરિયાદી ({formData.complainantAge || ''} વર્ષના વયસ્ક સિનિયર
            સિટિઝન) ને કેસની તમામ સુનાવણીમાં વીડિયો કોન્ફરન્સિંગ (VC)
            દ્વારા ઓનલાઈન હાજર રહેવાની મંજૂરી આપવી.
          </li>

          <li>
            સામાવાળાને હુકમ કરવામાં આવે કે તેઓ આજીવન મેન્ટેનન્સ પેટે જમા
            કરેલ રકમ રૂ. {formData.maintenanceAmountDigits || ''}/- રકમ
            જમા કર્યા તારીખથી વસૂલાત થાય ત્યાં સુધી ૧૨% ના વાર્ષિક વ્યાજ
            સાથે ટ્રાન્સફર/ચુકવણી કરે.
          </li>

          <li>
            સામાવાળાને આજીવન મેન્ટેનન્સ ફંડનું પ્રમાણિત અને ઓડિટ થયેલું
            હિસાબી પત્રક રજૂ કરવા આદેશ કરવો.
          </li>

          <li>
            વયસ્ક ફરિયાદીને થયેલ માનસિક ત્રાસ અને આર્થિક હેરાનગતી બદલ રૂ.{' '}
            {formData.compensationAmount || ''}/- નું વળતર આપાવવું.
          </li>

          <li>
            ફરિયાદીને કાનૂની કાર્યવાહીના ખર્ચ પેટે રૂ.{' '}
            {formData.legalCostAmount || '___'}/- સામાવાળા પાસેથી અપાવવા.
          </li>

          <li>
            ન્યાયના હિતમાં જે અન્ય યોગ્ય રાહત લાગે તે આપવા મંજૂર કરશો.
          </li>
        </ol>

        {/* Optional notes */}
        {notesHtml && (
          <div
            style={{
              marginTop: '20px',
              padding: '15px',
              border: '1px solid #000',
              borderRadius: '4px',
              backgroundColor: '#fafafa',
            }}
          >
            <p style={{ margin: '0 0 5px 0' }}>
              <strong>
                વધારાની વિગતો / નોંધ (Custom Legal Addendum):
              </strong>
            </p>

            <div
              dangerouslySetInnerHTML={{ __html: notesHtml }}
              style={{ fontSize: '13px' }}
            />
          </div>
        )}

        {/* Signature */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '30px',
          }}
        >
          <div>
            <p style={{ margin: 0 }}>
              સ્થળ: {formData.place}
            </p>

            <p style={{ margin: 0 }}>
              તારીખ:{' '}
              {formData.currentDate || '//' + formData.currentYear}
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <p style={{ margin: '0 0 40px 0' }}>
              ફરિયાદીની સહી
            </p>

            <p style={{ margin: 0 }}>
              (
              {formData.complainantName ||
                '_______________________'}
              )
            </p>
          </div>
        </div>

        {/* Verification */}
        <div
          style={{
            borderTop: '1px dashed #000',
            margin: '40px 0',
            paddingTop: '20px',
          }}
        >
          <p
            style={{
              textAlign: 'center',
              margin: '0 0 15px 0',
            }}
          >
            <strong>સત્યતાનું સોગંદનામું (Verification)</strong>
          </p>

          <p
            style={{
              textIndent: '30px',
              textAlign: 'justify',
              margin: 0,
            }}
          >
            હું, {formData.complainantName || ''}, પત્ની / પિતા{' '}
            {formData.spouseName || ''}, ઉંમર વર્ષ{' '}
            {formData.complainantAge || ''}, રહે.{' '}
            {formData.address ||
              '_________________________________________________'}
            , આથી પ્રતિજ્ઞાપૂર્વક જણાવું છું કે ઉપર જણાવેલ પેરા ૧ થી ૪ ની
            તમામ વિગતો મારી સચોટ માહિતી અને માન્યતા મુજબ સત્ય અને સાચી છે.
          </p>

          <p style={{ marginTop: '15px' }}>
            આજે તારીખ{' '}
            {formData.currentDate || '//' + formData.currentYear} ના રોજ{' '}
            {formData.place} ખાતે સહી કરી.
          </p>

          <p style={{ textAlign: 'right', marginTop: '30px' }}>
            (સોગંદનામું કરનાર / ફરિયાદી)
          </p>
        </div>

        {/* VC Application */}
        <div
          style={{
            pageBreakBefore: 'always',
            borderTop: '2px solid #000',
            marginTop: '40px',
            paddingTop: '40px',
          }}
        >
          <div
            style={{
              textAlign: 'center',
              marginBottom: '20px',
            }}
          >
            <p style={{ margin: '0 0 5px 0' }}>
              <strong>
                વીડિયો કોન્ફરન્સિંગ (VC) દ્વારા હાજર રહેવા માટેની અલગ અરજી
              </strong>
            </p>

            <p style={{ margin: '0 0 5px 0' }}>
              <strong>
                રાજકોટ જિલ્લા ગ્રાહક તકરાર નિવારણ કમિશન સમક્ષ (ગુજરાત)
              </strong>
            </p>

            <p style={{ margin: 0 }}>
              અંતરિમ અરજી નંબર: ___ / {formData.currentYear}
              <br />
              મુખ્ય ગ્રાહક ફરિયાદ નંબર:{' '}
              {formData.complaintNumber || '___'} /{' '}
              {formData.currentYear} માં
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '20px',
            }}
          >
            <p style={{ margin: 0 }}>
              {formData.complainantName ||
                '_______________________'}
            </p>

            <p style={{ margin: 0 }}>... ફરીયાદી</p>
          </div>

          <div style={{ textAlign: 'center', margin: '10px 0' }}>
            <p style={{ margin: 0 }}>વિરુદ્ધ</p>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '20px',
            }}
          >
            <p style={{ margin: 0 }}>
              {formData.op1Title} અને અન્ય
            </p>

            <p style={{ margin: 0 }}>... સામાવાળા</p>
          </div>

          <p
            style={{
              textAlign: 'center',
              margin: '20px 0',
              fontWeight: 'bold',
            }}
          >
            ફરિયાદી તરફથી વીડિયો કોન્ફરન્સિંગ (VC) મારફતે સુનાવણીમાં
            જોડાવા માટેની અરજી
          </p>

          <p style={{ margin: '0 0 10px 0' }}>
            સવિનય રજૂઆત કે:
          </p>

          <ol
            style={{
              paddingLeft: '20px',
              margin: '0 0 20px 0',
            }}
          >
            <li>
              ફરિયાદીએ સામાવાળા સામે આજીવન મેન્ટેનન્સ ફંડ પરત મેળવવા અને
              સેવામાં ખામી બદલ મુખ્ય ફરિયાદ દાખલ કરેલ છે.
            </li>

            <li>
              ફરિયાદી{' '}
              {formData.complainantName || '____________________'}ની ઉંમર{' '}
              {formData.complainantAge || ''} વર્ષ (સિનિયર સિટિઝન) છે
              (ઉંમરનો પુરાવો / આધાર કાર્ડ સામેલ છે).
            </li>

            <li>
              મોટી ઉંમર અને શારીરિક અશક્તતાના કારણે ફરિયાદી માટે દરેક
              સુનાવણી વખતે કમિશન સમક્ષ પ્રત્યક્ષ હાજર રહેવું શારીરિક રીતે
              ખૂબ મુશ્કેલ છે.
            </li>

            <li>
              ગ્રાહક સુરક્ષા કાયદા અને વર્ચ્યુઅલ કોર્ટની સુવિધાઓ મુજબ
              સિનિયર સિટિઝનને ઓનલાઈન વીડિયો કોન્ફરન્સિંગ મારફતે કેસની
              કાર્યવાહીમાં જોડાવાનો અધિકાર છે.
            </li>
          </ol>

          <p style={{ margin: '0 0 5px 0' }}>
            <strong>પ્રાર્થના:</strong>
          </p>

          <p
            style={{
              textIndent: '30px',
              margin: '0 0 30px 0',
            }}
          >
            આથી નમ્ર વિનંતી છે કે ફરિયાદીને આ કેસની તમામ મુદતો અને સુનાવણી
            દરમિયાન રજિસ્ટ્રી દ્વારા પૂરી પાડવામાં આવતી Cisco Webex / NIC
            Video Call Link મારફતે વીડિયો કોન્ફરન્સિંગ (VC) થી હાજર રહેવાની
            મંજૂરી આપવા મંજૂર કરશો.
          </p>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <p style={{ margin: 0 }}>
                સ્થળ: {formData.place}
              </p>

              <p style={{ margin: 0 }}>
                તારીખ:{' '}
                {formData.currentDate ||
                  '//' + formData.currentYear}
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <p style={{ margin: '0 0 40px 0' }}>
                ફરિયાદીની સહી
              </p>

              <p style={{ margin: 0 }}>
                (
                {formData.complainantName ||
                  '_______________________'}
                )
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}