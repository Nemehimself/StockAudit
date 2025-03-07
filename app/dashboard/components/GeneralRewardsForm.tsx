import React from 'react';
import ToolTip from './ToolTip';

interface GeneralFormProps {
  title: string;
  pointsCost: string | undefined;
  rewardValue: string | undefined;
  currency: string | undefined;
  setTitle: (val: string) => void;
  setPointsCost: (val: string) => void;
  setRewardValue: (val: string) => void;
  setCurrency: (val: string) => void;
}

const GeneralForm: React.FC<GeneralFormProps> = ({
  title,
  pointsCost,
  rewardValue,
  currency,
  setCurrency,
  setTitle,
  setPointsCost,
  setRewardValue,
}) => {
  return (
    <div className="space-y-6">
      <p>
        Enter the title, points code and other informations concering your
        rewards here.
      </p>
      <div>
        <label className=" mb-1 flex items-center gap-2">
          Title (required)
          <ToolTip content="This represents the title or name of the reward" />
        </label>
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="block w-full p-2 border-b-2 border-[#838383] focus:border-[#2D3DFF] outline-none"
        />
      </div>
      <div>
        <label className=" mb-1 flex items-center gap-2">
          Points Cost (required)
          <ToolTip content="This represents the amount of points it will cost a customer to redeem this reward" />
        </label>
        <input
          type="number"
          placeholder="Enter points cost"
          value={pointsCost ?? ''}
          onChange={e => setPointsCost(e.target.value)}
          className="block w-full p-2 border-b-2 border-[#838383] focus:border-[#2D3DFF] outline-none"
        />
      </div>
      <div>
        <label className=" mb-1 flex items-center gap-2">
          Select a currency (required)
          <ToolTip content="This is the currency this reward will be operated in" />
        </label>
        <select
          name="currency"
          className="block w-full p-2 border-b-2 border-[#838383] focus:border-[#2D3DFF] outline-none"
          value={currency}
          onChange={e => setCurrency(e.target.value)}
        >
          <option value="">Select a currency</option>
          <option value="$">United States - Dollar ($)</option>
          <option value="€">European Union - Euro (€)</option>
          <option value="£">United Kingdom - Pound Sterling (£)</option>
          <option value="¥">Japan - Yen (¥)</option>
          <option value="A$">Australia - Australian Dollar (A$)</option>
          <option value="C$">Canada - Canadian Dollar (C$)</option>
          <option value="CHF">Switzerland - Swiss Franc (CHF)</option>
          <option value="¥">China - Yuan (¥)</option>
          <option value="kr">Sweden - Swedish Krona (kr)</option>
          <option value="NZ$">New Zealand - New Zealand Dollar (NZ$)</option>
          <option value="₹">India - Indian Rupee (₹)</option>
          <option value="R$">Brazil - Brazilian Real (R$)</option>
          <option value="₽">Russia - Russian Ruble (₽)</option>
          <option value="R">South Africa - South African Rand (R)</option>
          <option value="Mex$">Mexico - Mexican Peso (Mex$)</option>
          <option value="S$">Singapore - Singapore Dollar (S$)</option>
          <option value="HK$">Hong Kong - Hong Kong Dollar (HK$)</option>
          <option value="kr">Norway - Norwegian Krone (kr)</option>
          <option value="₩">South Korea - South Korean Won (₩)</option>
          <option value="₺">Turkey - Turkish Lira (₺)</option>
          <option value="د.إ">United Arab Emirates - UAE Dirham (د.إ)</option>
          <option value="﷼">Saudi Arabia - Saudi Riyal (﷼)</option>
          <option value="zł">Poland - Polish Złoty (zł)</option>
          <option value="₴">Ukraine - Ukrainian Hryvnia (₴)</option>
          <option value="₸">Kazakhstan - Kazakhstani Tenge (₸)</option>
          <option value="₫">Vietnam - Vietnamese Đồng (₫)</option>
          <option value="₱">Philippines - Philippine Peso (₱)</option>
          <option value="₦">Nigeria - Nigerian Naira (₦)</option>
          <option value="₡">Costa Rica - Costa Rican Colón (₡)</option>
          <option value="₲">Paraguay - Paraguayan Guaraní (₲)</option>
          <option value="₪">Israel - Israeli Shekel (₪)</option>
          <option value="₮">Mongolia - Mongolian Tögrög (₮)</option>
          <option value="៛">Cambodia - Cambodian Riel (៛)</option>
          <option value="﷼">Qatar - Qatari Riyal (﷼)</option>
          <option value="₭">Laos - Lao Kip (₭)</option>
          <option value="₨">Mauritius - Mauritian Rupee (₨)</option>
          <option value="₩">North Korea - North Korean Won (₩)</option>
          <option value="₪">Palestine - Palestinian Shekel (₪)</option>
          <option value="₮">Tajikistan - Tajikistani Somoni (₮)</option>
          <option value="₺">Northern Cyprus - Turkish Lira (₺)</option>
          <option value="₼">Azerbaijan - Azerbaijani Manat (₼)</option>
          <option value="₾">Georgia - Georgian Lari (₾)</option>
          <option value="₴">Transnistria - Transnistrian Ruble (₴)</option>
          <option value="₽">Abkhazia - Abkhazian Apsar (₽)</option>
          <option value="₽">South Ossetia - South Ossetian Ruble (₽)</option>
          <option value="₽">
            {"Donetsk People's Republic - Donetsk Ruble (₽)"}
          </option>
          <option value="₽">
            {"Luhansk People's Republic - Luhansk Ruble (₽)"}
          </option>
          <option value="₽">Somaliland - Somaliland Shilling (₽)</option>
          <option value="₽">Artsakh - Artsakh Dram (₽)</option>
        </select>
      </div>
      <div>
        <label className=" mb-1 flex items-center gap-2">
          Reward Value (required)
          <ToolTip content="This is the value customer will get once they have enough point to redeem the reward" />
        </label>
        <label className="block mb-1"></label>
        <input
          type="number"
          placeholder="Enter reward value"
          value={rewardValue ?? ''}
          onChange={e => setRewardValue(e.target.value)}
          className="block w-full p-2 border-b-2 border-[#838383] focus:border-[#2D3DFF] outline-none"
        />
      </div>
    </div>
  );
};

export default GeneralForm;
