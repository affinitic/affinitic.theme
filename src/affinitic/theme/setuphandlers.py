# -*- coding: utf-8 -*-
from Products.CMFPlone.interfaces import INonInstallable
from plone import api
from zope.interface import implementer


@implementer(INonInstallable)
class HiddenProfiles(object):

    def getNonInstallableProfiles(self):
        """Hide uninstall profile from site-creation and quickinstaller"""
        return [
            'affinitic.theme:uninstall',
        ]


def post_install(context):
    """Post install script"""
    # Do something at the end of the installation of this package.
    # Add variables less
    lessvars = api.portal.get_registry_record('plone.lessvariables')
    lessvars_new = {
        'color-default': u'rgba(0,123,179,1)',
        'color-light': u'rgba(255,255,255,1)',
        'color-dark': u'rgba(51,51,51,1)',
    }
    lessvars.update(lessvars_new)
    api.portal.set_registry_record('plone.lessvariables', lessvars)



def uninstall(context):
    """Uninstall script"""
    # Do something at the end of the uninstallation of this package.
