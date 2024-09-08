import { useTranslation } from "react-i18next";
import { Feature, Housing, Parameter } from "../HousingPage";

import '../../../styles/housing/sections/features-section.scss';
import { useState } from "react";
import FeatureService from "../../../helpers/FeatureService";

interface FeaturesSectionProps {
    housingData: Housing;
}

export default function FeaturesSection({ housingData }: FeaturesSectionProps) {
    const { t } = useTranslation();

    const [isExpanded, setIsExpanded] = useState(false);

    const groupedFeatures = groupByProperty(housingData.features, "typeCode");
    const [groupA1, groupA2] = splitGroupsEqually(groupedFeatures);
    const [groupB1, groupB2] = splitGroupsWithLimit(groupedFeatures, 5);

    const processParameters = (params: Parameter[]) => {
        const processedParams = params.reduce((acc, { value, parameterKey }) => {
            acc[parameterKey] = value;
            return acc;
        }, {} as { [key: string]: string })

        console.log(params);
        console.log(processedParams);

        return processedParams;
    }

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
                                        {feature.map((f, index) => {
                                            return (
                                                <>
                                                    <div className="feature" key={index}>
                                                        <div className="feature__icon">
                                                            <img src={FeatureService.getFeatureIcon(f.featureIcon.src)} />
                                                        </div>
                                                        
                                                        <div className="feature__data">
                                                            <div className="feature__name">
                                                                {!f.parameters ? t(f.nameCode) : (
                                                                    t(f.nameCode, processParameters(f.parameters))
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
                                        {feature.map((f, index) => {
                                            return (
                                                <>
                                                    <div className="feature" key={index}>
                                                        <div className="feature__icon">
                                                            <img src={FeatureService.getFeatureIcon(f.featureIcon.src)} />
                                                        </div>
                                                        <div className="feature__data">
                                                            <div className="feature__name">
                                                                {!f.parameters ? t(f.nameCode) : (
                                                                    t(f.nameCode, processParameters(f.parameters))
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
    const group1: GroupedRecord = {};
    const group2: GroupedRecord = {};
  
    let totalInGroup1 = 0;
    let totalInGroup2 = 0;
  
    Object.keys(grouped).forEach((key) => {
      const groupSize = grouped[key].length;
  
      if (totalInGroup1 + groupSize <= limit) {
        group1[key] = grouped[key];
        totalInGroup1 += groupSize;
      } else if (totalInGroup2 + groupSize <= limit) {
        group2[key] = grouped[key];
        totalInGroup2 += groupSize;
      } else {
        // If the group is too big to fit into one of the splits, break it down
        const splitAt = limit - totalInGroup2;
        group2[key] = grouped[key].slice(0, splitAt);
        group1[key] = grouped[key].slice(splitAt);
  
        totalInGroup1 += group1[key].length;
        totalInGroup2 += group2[key].length;
      }
    });
  
    return [group1, group2];
  }