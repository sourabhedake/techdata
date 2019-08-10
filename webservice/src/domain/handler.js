'use strict'

const _ = require('ramda')
const db = require('../db')
const util = require('../util')

async function getDomainMenuItems() {
    const domains = await db.map_subdomain.find({});
    if (!domains) {
        return util.httpResponse(404, {
            message: 'No Domains found'
        })
    }

    const domain_map = new Map();
    for (var domain of domains) {
        var subdomains = new Set (domain_map.get(domain.domain));
        subdomains.add(domain.subDomain);
        domain_map.set(domain.domain, subdomains);
    }

    const resultArray = []
    const addedDomains = []
    for (var [domain, subdomains] of domain_map) {
        const domain_res = await db.domain.findOne({ domainId: domain});
        if (domain_res) {
            addedDomains.push(domain);
            const domainDetails = {
                domainId: domain_res.domainId,
                title: domain_res.name,
                link: '/pages/domains',
                children: []
            }

            for (let subdomain of subdomains) {
                const subdomain_res = await db.domain.findOne({ domainId: subdomain });
                if (subdomain_res) {
                    addedDomains.push(subdomain);
                    domainDetails.children.push({
                        domainId: subdomain_res.domainId,
                        title: subdomain_res.name,
                        link: domainDetails.link +  '/' + subdomain_res.domainId
                    })
                }
            };
            resultArray.push(domainDetails)
        }
        
    }
    const other_domains = await db.domain.find({domainId : { $nin: addedDomains}});
    console.log(other_domains);
    if (other_domains.length) {
        other_domains.forEach(domain => {
            resultArray.push({
                title: domain.name,
                link: '/pages/domains/' + domain.domainId,
            });
        })
    }
    return util.httpResponse(200, {
        data: resultArray
    })
}

async function showDomain({},ctx)
{
    const domainId = ctx.params.domainId;
    const resultArray = [];
    const result = await db.domain.findOne({ domainId: domainId });
    if (!result) {
        return util.httpResponse(400, {
            message: 'No domain with this domainId found'
        })
    }
    else {
        const domainDetails = {
            domain: result.name,
            description: result.description
        }
        resultArray.push(domainDetails);
        for (var Id of result.quizId) {
            const result1 = await db.quiz.find({ quizId: Id }, { name: 1 })
            for (var res of result1) {
                const quizDetails = {
                    quizId: Id,
                    quizName: res.name
                }
                resultArray.push(quizDetails);
            }
        }

    }
    return util.httpResponse(200, {
        result: resultArray
    })
}

async function createDomain({
    domainName,
    description
}) {
    const result = await db.domain.findOne({
        name: domainName
    })

    if (!result) {
        const domainId = util.generateRandomString(5)

        const domain1 = await db.domain.create({
            domainName,
            domainId
        })
        await db.domain.findOneAndUpdate({
            domainId
        }, {
                name: domainName,
                description: description
            }
        )
        return util.httpResponse(200, {
            message: 'Domain created successfully'
        })
    }
    else {
        return util.httpResponse(200, {
            message: 'Domain with this name exists'
        })
    }
}

module.exports = {
    getDomainMenuItems,
    showDomain,
    createDomain
}
