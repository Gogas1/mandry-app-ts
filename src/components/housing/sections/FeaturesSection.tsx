import { useTranslation } from "react-i18next";
import { Feature, Housing } from "../HousingPage";

import '../../../styles/housing/sections/features-section.scss';
import { useState } from "react";
import FeatureService from "../../../helpers/FeatureService";

interface FeaturesSectionProps {
    housingData: Housing;
}

export default function FeaturesSection({ housingData }: FeaturesSectionProps) {
    const { t } = useTranslation();

    const [isExpanded, setIsExpanded] = useState(false);

    const groupedFeatures = groupByProperty(housingData.features.filter(f => !f.isHouseRule), "typeCode");
    const [groupA1, groupA2] = splitGroupsEqually(groupedFeatures);
    const [groupB1, groupB2] = splitGroupsWithLimit(groupedFeatures, 4);

    return (
        <>
            <section className="features-section">
                <h2 className="header">
                    {t('HousingPage.Sections.Features.Header')}
                </h2>
                <div className="features-columns">
                    <div className="features-columns__col">
                        {Object.entries(isExpanded ? groupA1 : groupB1).map(([type, feature], index) => {
                            return (
                                <>
                                    <div className="features-block" key={index}>
                                        <h3 className="features-type">
                                            {t(type)}
                                        </h3>
                                        {feature.map((f, index1) => {
                                            return (
                                                <>
                                                    <div className="feature" key={index1}>
                                                        <div className="feature__icon">
                                                            <img src={FeatureService.getFeatureIcon(f.featureIcon.src)} />
                                                        </div>
                                                        
                                                        <div className="feature__data">
                                                            <div className="feature__name">
                                                                {!f.parameters ? t(f.nameCode) : (
                                                                    t(f.nameCode, FeatureService.processParameters(f.parameters))
                                                                )}
                                                            </div>
                                                            {f.descriptionCode ? (
                                                                <div className="feature__description">{t(f.descriptionCode)}</div>
                                                            ) : ''}
                                                        </div>
                                                    </div>
                                                </>
                                            );
                                        })}
                                    </div>
                                </>
                            );
                        })}
                    </div>
                    <div className="features-columns__col">
                        {Object.entries(isExpanded ? groupA2 : groupB2).map(([type, feature], index) => {
                            return (
                                <>
                                    <div className="features-block" key={index}>
                                        <h3 className="features-type">
                                            {t(type)}
                                        </h3>
                                        {feature.map((f, index1) => {
                                            return (
                                                <>
                                                    <div className="feature" key={index1}>
                                                        <div className="feature__icon">
                                                            <img src={FeatureService.getFeatureIcon(f.featureIcon.src)} />
                                                        </div>
                                                        <div className="feature__data">
                                                            <div className="feature__name">
                                                                {!f.parameters ? t(f.nameCode) : (
                                                                    t(f.nameCode, FeatureService.processParameters(f.parameters))
                                                                )}
                                                            </div>
                                                            {f.descriptionCode ? (
                                                                <div className="feature__description">{t(f.descriptionCode)}</div>
                                                            ) : ''}
                                                        </div>
                                                        
                                                    </div>
                                                </>
                                            );
                                        })}
                                    </div>
                                </>
                            );
                        })}
                    </div>
                </div>
                <button className="show-more-btn" onClick={() => setIsExpanded(!isExpanded)}>
                    {t(!isExpanded ? 'HousingPage.Sections.Features.MoreBtn' : 'HousingPage.Sections.Features.LessBtn', { number: housingData.features.length })}
                </button>
            </section>
        </>
    );
}

type GroupedRecord = Record<string, Feature[]>;

function groupByProperty(items: Feature[], key: keyof Feature): GroupedRecord {
    return items.reduce((acc, item) => {
      const groupKey = item[key] as string;
      if (!acc[groupKey]) {
        acc[groupKey] = [];
      }
      acc[groupKey].push(item);
      return acc;
    }, {} as GroupedRecord);
}

function splitGroupsEqually(grouped: GroupedRecord): [GroupedRecord, GroupedRecord] {
    const keys = Object.keys(grouped);
    const halfLength = Math.ceil(keys.length / 2);
  
    const group1: GroupedRecord = {};
    const group2: GroupedRecord = {};
  
    keys.forEach((key, index) => {
      if (index < halfLength) {
        group1[key] = grouped[key];
      } else {
        group2[key] = grouped[key];
      }
    });
  
    return [group1, group2];
}

function splitGroupsWithLimit(grouped: GroupedRecord, limit: number): [GroupedRecord, GroupedRecord] {
    const keys = Object.keys(grouped);
    const halfLength = Math.ceil(keys.length / 2);
  
    const group1: GroupedRecord = {};
    const group2: GroupedRecord = {};

    let group1Counter = 0;
    let group2Counter = 0;
  
    keys.forEach((key, index) => {
      if (index < halfLength && group1Counter < limit) {
        group1[key] = grouped[key];
        group1Counter += grouped[key].length
      } else if(group2Counter < limit) {
        group2[key] = grouped[key];
        group2Counter += grouped[key].length
      }
    });
  
    return [group1, group2];
  }