# -*- coding: utf-8 -*-
"""Setup tests for this package."""
from plone import api
from plone.app.testing import setRoles
from plone.app.testing import TEST_USER_ID
from affinitic.theme.testing import AFFINITIC_THEME_INTEGRATION_TESTING

import unittest


class TestSetup(unittest.TestCase):
    """Test that affinitic.theme is properly installed."""

    layer = AFFINITIC_THEME_INTEGRATION_TESTING

    def setUp(self):
        """Custom shared utility setup for tests."""
        self.portal = self.layer['portal']
        self.installer = api.portal.get_tool('portal_quickinstaller')

    def test_product_installed(self):
        """Test if affinitic.theme is installed."""
        self.assertTrue(self.installer.isProductInstalled(
            'affinitic.theme'))

    def test_browserlayer(self):
        """Test that IAffiniticThemeLayer is registered."""
        from affinitic.theme.interfaces import (
            IAffiniticThemeLayer)
        from plone.browserlayer import utils
        self.assertIn(IAffiniticThemeLayer, utils.registered_layers())


class TestUninstall(unittest.TestCase):

    layer = AFFINITIC_THEME_INTEGRATION_TESTING

    def setUp(self):
        self.portal = self.layer['portal']
        self.installer = api.portal.get_tool('portal_quickinstaller')
        roles_before = api.user.get_roles(username=TEST_USER_ID)
        setRoles(self.portal, TEST_USER_ID, ['Manager'])
        self.installer.uninstallProducts(['affinitic.theme'])
        setRoles(self.portal, TEST_USER_ID, roles_before)

    def test_product_uninstalled(self):
        """Test if affinitic.theme is cleanly uninstalled."""
        self.assertFalse(self.installer.isProductInstalled(
            'affinitic.theme'))

    def test_browserlayer_removed(self):
        """Test that IAffiniticThemeLayer is removed."""
        from affinitic.theme.interfaces import \
            IAffiniticThemeLayer
        from plone.browserlayer import utils
        self.assertNotIn(
            IAffiniticThemeLayer,
            utils.registered_layers(),
        )
