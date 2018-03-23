# encoding: utf-8


def getfooter(self):
    portal_catalog = getattr(self.context, 'portal_catalog')
    brains = portal_catalog.searchResults(portal_type='contact')
    return brains
